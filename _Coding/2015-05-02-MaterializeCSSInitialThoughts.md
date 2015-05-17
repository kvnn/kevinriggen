---
layout: post
title: Materialize CSS Overview
---
source: [http://materializecss.com](http://materializecss.com/)

Materialize is a CSS framework creating by Google in order to "provide familiar visual cues" using "components such as grids, typography, color and imagery" for "a sense of hierarchy, meaning and focus".

#1. CSS
------------------

<section>
## COLOR
To apply a background color, just add the color name and light/darkness as a class to the element

    <div class="card-panel teal lighten-2">This is a card panel with a teal lighten-2 class</div>

 To apply a text color, just append -text to the color class
    <div class="card-panel">
      <span class="blue-text text-darken-2">This is a card panel with dark blue text</span>
    </div>

 Extend the default classes using SCSS
    .ilike-blue-container {
        @extend .blue, .lighten-4;
    }

<div class="reveal">
    <h3 class="reveal-trigger"><a href="#"><expand>+</expand><expand class="hidden">-</expand> View default color palettes</a></h3>
    <div class="reveal-content">
        <img src="{{ site.url }}/img/materialize-color-1.png">
        <img src="{{ site.url }}/img/materialize-color-2.png">
        <img src="{{ site.url }}/img/materialize-color-3.png">
        <img src="{{ site.url }}/img/materialize-color-4.png">
        <img src="{{ site.url }}/img/materialize-color-5.png">
        <img src="{{ site.url }}/img/materialize-color-6.png">
        <img src="{{ site.url }}/img/materialize-color-7.png">
    </div>
</div>

</section>
<section>

## GRID
- standard 12 column fluid responsive grid system
- .container class is centered and ~70% of the window width
- .row classes contain .col classes
- .col classes have additional classes to specify a screen category and the number of columns (out of 12) to take up
    - e.g. "col s12" takes up 12 cols on small+ screens (all screens)
    - "col s12 m6" takes up 12 cols on small screens (mobile) and 6 cols on screens > small
- .section classes have vertical padding and are meant for organizing large sections of content
- .divider creates a full-width horizontal line for visual separation of content

</section>
<section>

## HELPERS
- .valign-wrapper to hold vertically-aligned .valign elements
- .left-align .right-align and .center-align for text
- .left and .right for floating
- .hide, .{hide|show}-on-{small|med|large}-only, .{hide|show}-on-{med-and-down|med-and-up}
- .truncate automatically truncates text and appends an ellipsis

</section>
<section>

## MEDIA
- .responsive-img to make images resize responsively
- .circle for circular images
- .video-container holds responsive video embeds
- .no-controls.video-container for videos w/o controls
- .responsive-video on video elems to make them responsive

</section>
<section>

## SASS
- change color scheme in _variables.scss
- @media #{ "$small|$medium|$large"-and-"up|down" } e.g. @media #{$small-and-down}
- @include transition(.3s) will output:
    - -webkit-transition: 0.3s;
    - -moz-transition: 0.3s;
    - -o-transition: 0.3s;
    - -ms-transition: 0.3s;
    - transition: 0.3s;

<div class="reveal">
    <h3><a href="#" class="reveal-trigger"><expand>+</expand><expand class="hidden">-</expand>View all mixins</a></h3>
    <ul class="reveal-content">

<li>animation($args)</li>
<li>animation-delay($delay)</li>
<li>animation-direction($direction)</li>
<li>animation-duration($duration)</li>
<li>animation-fill-mode($mode)</li>
<li>animation-iteration-count($count)</li>
<li>animation-name($name)</li>
<li>animation-play-state($state)</li>
<li>animation-timing-function($function)</li>
<li>background-size($args)</li>
<li>border-radius($args)</li>
<li>box-shadow($args)</br>
      - inner-shadow($args)</li>
<li>box-sizing($args)</br>
      - border-box()</br>
      - content-box()</li>
<li>columns($args)</br>
      - column-count($count)</br>
      - column-gap($gap)</br>
      - column-rule($args)</br>
      - column-width($width)</li>
<li>gradient($default,$start,$stop)</br>
      - linear-gradient-top($default,$color1,$stop1,$color2,$stop2,[$color3,$stop3,$color4,$stop4])</br>
      - linear-gradient-left($default,$color1,$stop1,$color2,$stop2,[$color3,$stop3,$color4,$stop4])</li>
<li>opacity($factor)</li>
<li>transform($args)</br>
      - transform-origin($args)</br>
      - transform-style($style)</br>
      - rotate($deg)</br>
      - scale($factor)</br>
      - translate($x,$y)</br>
      - translate3d($x,$y,$z)</br>
      - translateHardware($x,$y)</li>
<li>text-shadow($args)</li>
<li>transition($args)</br>
      - transition-delay($delay)</br>
      - transition-duration($duration)</br>
      - transition-property($property)</br>
      - transition-timing-function($function)</li>
    </ul>
</div>

</section>
<section>

## SHADOW
- In material design, everything should have a certain z-depth that determines how far raised or close to the page the element is
- .z-depth-2
- @extend .z-depth-2
![Materialize Shadows]({{ site.url }}/img/materialize-shadows.png)

</section>
<section>

## TABLE
- tables are styled by default
- .bordered will add borders to a table
- .striped will add zebra stripes to the table
- .hoverable will add hover states to table rows
- .centered to center all cols
- .responsive-table will make the table horizontally scrollable on smaller devices

</section>
<section>

## TYPOGRAPHY
- Google Roboto is used by default
- Change the font stack by modifying "font-family" for the "html" element
![Materialize font weights]({{ site.url }}/img/materialize-font-weights.png)
- .flow-text containers resize their text based on screen size

</section>

#2. COMPONENTS
-----------------
<section>
- Collections are list items
- Buttons have different states, sizes, positions, icons and flatness
- Cards:
    - a convenient means of displaying content composed of different types of objects
    - well-suited for presenting similar objects whose size or supported actions can vary considerably, like photos with captions of variable length
    - different sizes
    - image cards
    - reveal cards
- Footer:
    - sticky footer is supported
    - the following css will provide a sticky footer, where the page is organized into 3 main elems, <body> <main> <footer>:

    body {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
      }

    main {
        flex: 1 0 auto;
    }
