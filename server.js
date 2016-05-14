/*
* swsc - websockets server side
* provides a server for a simple chat application based on websockets.
* Supported protocol name: swscp
* author: Krenn Benjamin
*/
var WebSocketServer = require('websocket').server;
var express = require('express');
var http = require('http');

var app = express();
app.use(express.static('static'));
var server = http.createServer(app);
server.listen(8080, function() {
    console.log("server up.");
})


var messages = [];
var connections = [];

// Starting the websocket server
var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
});



// Handle requests
wsServer.on('request', function(request) {
    var connection = request.accept('swscp', request.origin);
    connections.push(connection);
    for(var i in messages) {
        connection.sendUTF(JSON.stringify(messages[i]));
    }

    console.log((new Date()) + ' Connection accepted.');
    // receiving messages
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            try {
                console.log('Received Message: ' + JSON.parse(message.utf8Data).content);
                console.log('Sending response..');
                
                //send to all connected clients
                connections.forEach(function(destination){
                    destination.sendUTF(message.utf8Data);
                });

                messages.push(JSON.parse(message.utf8Data));
            } catch (err) {
                console.log(err);
            }
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + '  client: ' + connection.remoteAddress + ' disconnected.');
        // remove the connection
        var index = connections.indexOf(connection);
        if (index !== -1) {
            // remove the connection from the pool
            connections.splice(index, 1);
        }
    });

    connection.on('error', function(err) {
        console.log(err);
    })
});

