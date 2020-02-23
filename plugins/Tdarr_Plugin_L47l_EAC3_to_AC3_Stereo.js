function details() {

  return {
    id: "Tdarr_Plugin_L47l_EAC3_to_AC3_Stereo",
    Stage: "Pre-processing",
    Name: "Convert EAC3 to AC3 Stereo",
    Type: "Video",
    Description: `[Contains built-in filter] If the file has EAC3 sound tracks they will be converted to ac3 stereo. \n\n`,
    Version: "0.01",
    Link: "",
    Tags:'pre-processing,ffmpeg',
  }
  
}

function plugin(file) {

  //Must return this object

  var response = {

    processFile: false,
    preset: '',
    container: '.mp4',
    handBrakeMode: false,
    FFmpegMode: false,
    reQueueAfter: false,
    infoLog: '',

  }

  if (file.fileMedium !== "video") {

    console.log("File is not video")

    response.infoLog += "☒File is not video \n"
    response.processFile = false;

    return response

  } else {

    var audioIdx = -1
    var ffmpegCommandInsert = ''
    var hasEAC3Track = false
    
    // Loop through each stream in the container
    for (var i = 0; i < file.ffProbeData.streams.length; i++) {

      // check that the stream in question is an audio stream, and increment the counter if it is
      try {
        if (file.ffProbeData.streams[i].codec_type.toLowerCase() == "audio") {
          audioIdx++
          console.log("current track: " + i + ", audioIdx: " + audioIdx);
        }
      } catch (err) { }

      // if the stream is an audio stream, and it is an EAC3 steam, then use the stream ID in the 
      try {
        if (file.ffProbeData.streams[i].codec_name == 'eac3' && file.ffProbeData.streams[i].codec_type.toLowerCase() == "audio" ) {
          ffmpegCommandInsert += ` -c:a:${audioIdx} ac3 -ac 2 `
          hasEAC3Track = true
          console.log("Track meets criteria - current track: " + i + ", audioIdx: " + audioIdx);
        }
      } catch (err) { }

    }

    var ffmpegCommand = `,-map 0 -c:v copy  -c:a copy ${ffmpegCommandInsert} -c:s copy -c:d copy`
    console.log("ffmpeg command: " + ffmpegCommand);

    if (hasEAC3Track == true) {

      response.processFile = true;
      response.preset = ffmpegCommand
      response.container = '.' + file.container
      response.handBrakeMode = false
      response.FFmpegMode = true
      response.reQueueAfter = true;
      response.infoLog += "File has EAC3 audio! \n"
      return response



    } else {
      response.infoLog += "No EAC3 streams found! \n"
    }

    response.infoLog += "File meets conditions! \n"
    return response

  }
}
  
module.exports.details = details;

module.exports.plugin = plugin;