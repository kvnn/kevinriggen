---
layout: post
title: Initial Thoughts on Ember.js
---

My thoughts while reading [Understanding Ember.js](http://guides.emberjs.com/v1.11.0/understanding-ember/the-view-layer/).

## Handlebars Templates
- shit yeah!

## Child Views
- these solve some problems with child-views that I often encounter when using Backbone:
    - I must write application code to instantiate and clean up child views within a parent view
    - event delegation of the parent view trickles down into the children

## Event Delegation
- its nice that they handle context within event delegation
- its nice that they handle un-delegation of child views

## The Rendering Pipeline
> " For Ember.js, we've done the work to make templates written using the Handlebars templating language automatically update when the values used inside of them are changed."

Here how a template and view combination is rendered and inserted into the DOM as a string:

![Ember render process](http://guides.emberjs.com/v1.11.0/images/view-guide/render-buffer.png)

> "After the view inserts itself into the DOM, either Ember or the application may want to re-render the view. They can trigger a re-render by calling the rerender method on a view."

> "Ember delegates all events to the application's root element ... When an event occurs, Ember identifies the nearest view that handles the event and invokes its event handler"

## Lifecycle Hooks
> "In order to make it easy to take action at different points during your view's lifecycle, there are several hooks you can implement."
    - willInsertElement
    - didInsertElement
    - willDestroyElement
    - willClearRender
    - becameVisible
    - becameHidden
    - These can be registered by defining the hook's name as a method within or as an event registered to the view

## Templated Views
Ember's templates create a view hierarchy automatically, like this:
![Ember template evaluation](http://guides.emberjs.com/v1.11.0/images/view-guide/template-appendChild-interaction.png)

## Asynchrony
- Template elements are bound to properties on the post controller. When the post controller's model changes, it automatically propagates those changes to the DOM. Beyond convenient, this forces the good practice of keeping names the same between API, controllers and templates

> "When you make a change to a property in Ember, it does not immediately propagate that change. Instead, it invalidates any dependent properties immediately, but queues the actual change to happen later."

- as opposed to an event-driven approach like Backbone, a listener that responds to multiple events will (using a queue) wait until all bound events have finished (which may change state) before triggering

> "In Ember, you should always assume that the side-effects of a change you make will happen later. By making that assumption, you allow Ember to coalesce repetitions of the same side-effect into a single call"

## Debugging
- there are a lot of useful debugging resources for ember, including a specific inspector

## The Run Loop
> "Ember's internals and most of the code you will write in your applications takes place in a run loop. The run loop is used to batch, and order (or reorder) work in a way that is most effective and efficient."

- work in the queue is ordered by priority according to a documented algorithm
- the run loop is what allows a listener that responds to multiple events not to fire until all of its events have been triggered

The run loop aims to improve something like this:
    foo.style.height = "500px" // write
    foo.offsetHeight // read (recalculate style, layout, expensive!)

    bar.style.height = "400px" // write
    bar.offsetHeight // read (recalculate style, layout, expensive!)

    baz.style.height = "200px" // write
    baz.offsetHeight // read (recalculate style, layout, expensive!)

Into something like this, automatically:
    foo.style.height = "500px" // write
    bar.style.height = "400px" // write
    baz.style.height = "200px" // write

    foo.offsetHeight // read (recalculate style, layout, expensive!)
    bar.offsetHeight // read (fast since style and layout is already known)
    baz.offsetHeight // read (fast since style and layout is already known)

- Understanding the run loop will be pertinent when integrating with a non-Ember API that includes some sort of asynchronous callback.
    * AJAX callbacks
    * DOM update and event callbacks
    * Websocket callbacks
    * setTimeout and setInterval callbacks
    * postMessage and messageChannel event handlers"

- If you forget to wrap a non-EMber async callback in Ember.run, it will approximate a beginning and end for you. This is suboptimal, so always wrap these things in an Ember.run statement.
- In *testing mode*, autoruns will not happen and will result in an error. This gives you a chance to fix these instances while allowing some slack on production.
- Also - Ember's tests may give erroneous errors when async application code is ran outside of a run loop

## Dependency Injection & Service Lookup
- *dependency injection*: a dependent object being injected onto another object during instantiation
- *service lookup*: when a dependency is created or fetched on demand
- these share the same goals:
    + Isolate responsibilities in an application
    + Avoid the use of global variables and instances (important for testing)
    + Allow a single object instance to represent state, but share that state with other objects.


