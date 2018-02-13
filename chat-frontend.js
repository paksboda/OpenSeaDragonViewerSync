var socket = function () {
    "use strict";

    // for better performance - to avoid searching in DOM
    var content = $('#content');
    var status = $('#status');

    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
                                    + 'support WebSockets.'} ));
        $('span').hide();
        return;
    }

    // open connection
    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
		// Do nothing..
    };

    connection.onerror = function (error) {
        // just in there were some problems with conenction...
        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                    + 'connection or the server is down.' } ));
    };

    // most important part - incoming messages
    connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {
			console.log("Received message : " + message.data);
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

        // NOTE: if you're not sure about the JSON structure
        // check the server source code above
		if (json.type === 'event') { // it's a event message
			//var img = new Image();
			//img.src = json.data.source;
			imagingHelper.setView(json.data.width, json.data.height, new OpenSeadragon.Point(json.data.centerX,json.data.centerY), false);
			//image2.updateLocation(json.data.x, json.data.y);
        } else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
        }
    };
	
	function send(message){
		connection.send(message);
	}


    /**
     * This method is optional. If the server wasn't able to respond to the
     * in 3 seconds then show some error message to notify the user that
     * something is wrong.
     */
    setInterval(function() {
        if (connection.readyState !== 1) {
            status.text('Error');
			content.html($('<p>', { text: 'Unable to comminucate with the WebSocket server.'} ));
        }
    }, 3000);
	
	return {
      send:  send// Not private anymore!
   };
}

var socketApp = socket();


var viewer = OpenSeadragon({
	id:            "visibility-ratio-1",
	prefixUrl:     "/openseadragon/images/",
	tileSources:   "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi",
	visibilityRatio: 1.0,
	constrainDuringPan: true
});
var imagingHelper = viewer.activateImagingHelper({onImageViewChanged: onImageViewChanged});
function onImageViewChanged(event) {
	//alert( "Width : " + event.viewportWidth + " Height : " + event.viewportHeight + " Center : "+ event.viewportCenter);
	console.log("Cought event in viewer 1");
	socketApp.send(JSON.stringify({source:'None', width:event.viewportWidth, height:event.viewportHeight, centerX:event.viewportCenter.x, centerY:event.viewportCenter.y }));
	console.log("Sent message to server" + JSON.stringify({source:'None', width:event.viewportWidth, height:event.viewportHeight, centerX:event.viewportCenter.x, centerY:event.viewportCenter.y }));
}