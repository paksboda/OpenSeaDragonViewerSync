<H1>Introduction</H1>

This is demo implementation of sync two viewer having image in two different browser instance.
You can pan and zoom into one viewer and second viewer will sync its position to first one.
I have implemented it using Openseadragon framework, OpenSeadragonImagingHelper and Websocket.

I found very nice example of websocket here to jump start. 
https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

OpenSeadragonImagingHelper can be found here.
https://github.com/msalsbery/OpenSeadragonImagingHelper

<H1>How To Run</H1>

Download or Clone this repository.
Go to repository folder and open command prompt there.

Run below command.

 <b><i>npm install websocket</i></b>

Above command will download required libraries for websocket and your code is ready to run.

In same folder run below command to start node server.

<b><i>node sync-server.js</i></b>

Now open frontend.html and frontend-receiver.html in two different browser instance.

Try to pan and zoom image on frontend.html and same will be synced with frontend-receiver.html on different browser.
