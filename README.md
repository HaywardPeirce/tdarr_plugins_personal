# tdarr_plugins_personal

A collection of plugins for [Tdarr](https://github.com/HaveAGitGat/Tdarr)

## Usage
Local plugins should be installed in `/home/Tdarr/Documents/Tdarr/Plugins/Local/`, and might require nano to be installed and root for permission to write to the folder in the Tdarr docker container

## Tdarr_Plugin_L47l_EAC3_to_AC3_Stereo
Based on `the1poet` [surround sound plugin](https://github.com/HaveAGitGat/Tdarr_Plugins/blob/master/Community/Tdarr_Plugin_b39x_the1poet_surround_sound_to_ac3.js), this plugin transcodes EAC3 audio into stereo AC3.

It uses the ffmpeg option ` ac3 -ac 2` to select the audio codec and number of channels based on information found [here](https://superuser.com/questions/852400/properly-downmix-5-1-to-stereo-using-ffmpeg)