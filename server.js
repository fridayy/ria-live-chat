/*
* swsc - websockets server side
* provides a server for a simple chat application based on websockets.
* Supported protocol name: swscp
* author: Krenn Benjamin
*/
var WebSocketServer = require('websocket').server;
var http = require('http');

var messages = [];

// Starting the websocket server
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log('swsc server started on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});



// Handle requests
wsServer.on('request', function(request) {
    var connection = request.accept('swscp', request.origin);
    
    for(var i in messages) {
        connection.sendUTF(messages[i]);
    }

    console.log((new Date()) + ' Connection accepted.');
    // receiving messages
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            console.log('Sending response..');
            connection.sendUTF(message.utf8Data);

            messages.push(message.utf8Data);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + '  client: ' + connection.remoteAddress + ' disconnected.');
    });
});

