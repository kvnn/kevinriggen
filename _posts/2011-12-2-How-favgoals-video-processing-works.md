---
layout: post
title:  How FavGoal's video processing works
---


## How FavGoal's video processing works
` [ in process ] `


#### Video Upload
1. A user uploads a video and submits data with it
2. The video and data are validated
3. If everything checks out, the video is shipped to the pending box
4. If something is amiss, we let the user know


#### Acceptance / Rejection
1. Videos are stored in a pending box within a CDN
2. FavGoal admins have can browse pending videos and let them in or reject them
3. If a video is rejected, the user is sent a message that will display when they log in
4. If a video is accepted, it gets marked for download by the Process Monster


#### The Process Monster
> The process monster is an Ubuntu server machine sitting near my feet

1. The Process Monster downloads acceptable pending videos from the pending box at the cdn
2. The video is processed
	+ a mobile ready mp4 is processed using the following ffmpeg command :
	          
	      `ffmpeg -y -i video_file -vcodec libx264 -b 512k -flags +loop+mv4 -cmp 256 \
          -partitions +parti4x4+parti8x8+partp4x4+partp8x8+partb8x8 \
          -s 640x360 -me_method hex -subq 7 -trellis 1 -refs 5 -bf 0 \
          -flags2 +mixed_refs -coder 0 -me_range 16 \
          -g 250 -keyint_min 25 -sc_threshold 40 -i_qfactor 0.71 -qmin 10\
          -qmax 51 -qdiff 4 output.mp4 `
        
3. The video is marked as processed and given a new life on the cdn


#### Public Nudity
1. The web app imports all new videos into the database
2. The video is now considered a Goal
3. The end








