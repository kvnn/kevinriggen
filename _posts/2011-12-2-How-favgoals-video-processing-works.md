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
1. The Process Monster downloads acceptable pending videos from the pending box at the cdn
2. The video is processed
3. The video is marked as processed and given a new life on the cdn


#### Public Nudity
1. The web app imports all new videos into the database
2. The video is now considered a Goal
3. The end








