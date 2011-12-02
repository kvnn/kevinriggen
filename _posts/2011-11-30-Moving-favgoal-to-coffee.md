---
layout: post
title:  How I moved favgoal.com from jQuery to jQuery + coffee
---

## A list of the original javascript files and their functions

####Account
* add / change email
* change password
* show user a message on account.html or upload_avatar.html

####Admin
* scripts that run if an administrator is logged in and help them administrate

####Base
* stuff that is very general, miscellaneous or that everything else depends on
* csrf setup
* device / screen detection
* general modal stuff
* error display
* looks for an error hashtag and displays an error if found

####Comments
* insert a comment into the dom
* let user a add comment

####Filters
* tracks the current goal filter state
* updates the goal thumbnails list
* lets a user change the filter state
* looks for a filter hashtag and applies filters if its found

####Goals-Load
* loads thumbnails into the dom
* controls 'more' functionality

####Goals-Play
* controls currently unused image-only video support
* loads wikipedia content into goal modal
* open / close a goal modal
* retrieves goal attributes video src, etc. when a goal modal is opened
* play / pause video
* favorite-button functionality
* checks url for a goal id in the hashtag and opens a goal if found

####Upload
* display a success or error message to a user who has submitted the upload-goal form

####Users
* determines a user's state and sets it in the DOM logged-in, facebook-registered.
* controls the login / register modal
* controls the login / register process
* generates the user list shown in the sidebar



## Process for moving to coffee script

1. install coffee and get `coffee` working in my terminal.

2. for each file_name.js :
	1. save as file_name-orig.js if you don't have version control
	2. save as file_name.coffee
	3. change syntax to coffee syntax
	    a. I search & replaced the following :
	        /* to '''
	        */ to '''
	        // to #
	        function.{ to ->
	        "var " to ""
	    b. everything else I changed manually
	    c. get rid of ternaries
	4. run `coffee -c file_name.coffee`
	5. fix errors
	    a. It is common to run into strange issues regarding indentation. the most obvious if an error like "unexpected indent at line 145" when the indent makes complete sense. This is surely a space / tab issue in your editor.
	    b. If you get an error like "word is not defined", than you've left in a "var" or "function" somewhere.
	6. if compilation works, test all functionality that this file provides
        a. Some of my refactored code compiled without error but ended up being semantically different than my original file. I believe that every case was due to bad indentation on my part.




