0 - Responsive App

Simple responsive stage + container centering for pixi/react v8-Beta21

Note that the use of a component wapping Application and `onInit` to prevent errors when trying to draw before the
application is initialized.

The stage automatically resizes using `resizeTo`, referencing the parent div - the square in the center is automatically
adjusted to stay in the center of the stage as it moves, using a listener attached to the app.  