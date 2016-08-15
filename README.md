### What is this?

A map editor I wrote in javascript using react/redux. Other fully fleshed-out applications like Tiled exist but I thought this would be a good chance to try out electron. Their IPC modules for communicating between browser windows function much like web sockets. Cool beans.

### Current Features

-   Customize the number of rows and columns of the map and the grid dimensions
-   Open a spritesheet in the sidebar and click to select a portion of it
-   Paint/Erase the tilemap by left-clicking or dragging the mouse along tiles
-   Save a .json file which includes the filename of the spritesheet and the background coordinates used for each square of the tilemap
