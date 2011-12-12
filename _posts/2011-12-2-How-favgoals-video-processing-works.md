---
layout: post
title:  How FavGoal's video processing works
---


## How FavGoal's video processing works
` [ in process ] `



#### Video Upload
1. A user uploads a video and its meta data
2. If everything validates :
	* the video is transferred to a 'pending' container on the cdn
	* the video is saved in the database with a 'pending' flag



#### Acceptance / Rejection
1. FavGoal admins browse pending videos and accept or reject them
2. If a video is rejected, the user is notified and the video is removed from the 'pending' container and the cdn
3. If a video is accepted, it gets marked for download by the Process Monster



#### The Process Monster
*an ubuntu box keeping my feet warm*

1. The Process Monster downloads the accepted pending videos from the pending box at the cdn
2. The video is processed
	+ a mobile ready mp4 is processed using the following ffmpeg command :
	          
	      ffmpeg -y -i video_file -vcodec libx264 -b 512k -flags +loop+mv4 -cmp 256 \
          -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 \
          -s 640x360 -me_method hex -subq 7 -trellis 1 -refs 5 -bf 0 \
          -flags2 +mixed_refs -coder 0 -me_range 16 \
          -g 250 -keyint_min 25 -sc_threshold 40 -i_qfactor 0.71 -qmin 10\
          -qmax 51 -qdiff 4 output.mp4

    + TODO : an flv is encoded for flash playback
    + frames are extracted from the video using the following ffmpeg command :
          ffmpeg -i video -sameq -r 25 -f image2 frames_dir/%06d.jpg
    + an arbitrary frame is used as the video thumbnail
    + the frames are montaged together into sets of 65000px wide jpegs, mostly for my sick pleasure but also to one day offer image-only playback or cool image archival or something. Here is the imagemagick montage command I use for each set:

          montage -tile x1 -quality 50 -geometry 650x400+0+0 list_of_frames_in_this_65000px_wide_set montage_dir/montage-goal.jpg

    + Take note : these commands are simplified here. They exist within loops and conditionals with variables for file names and option parameters. If you want more details, feel free to ask me on Google+ or something. 
         
        
3. Upon each successful process (thumbnail, mp4 generation, etc) the corresponding file is uploaded to the cdn in a public container

4. When all steps have finished, the video is upgraded from 'pending' to 'public'









