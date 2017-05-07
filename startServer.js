/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(1337, function () { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});
var listBins = [];
for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
        for (var k = 0; k < 2; k++) {
            for (var l = 0; l < 2; l++) {
                for (var m = 0; m < 2; m++) {
                    for (var n = 0; n < 2; n++) {
                        for (var o = 0; o < 2; o++) {
                            for (var p = 0; p < 2; p++) {
                                listBins.push(
                                        {
                                            'deviceuid': Math.random(),
                                            'bitpattern': "" + i + j + k + l + m + n + o + p
                                        }
                                );
                            }
                        }
                    }
                }
            }
        }
    }
}
// WebSocket server
wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function (message) {
        console.log('Server On message :: ', message);
        if (message.type === 'utf8') {
            // process WebSocket message
            setInterval(function () {
                connection.send(JSON.stringify(listBins.slice(0, 50)));
            }, 100);
        }
    });

    connection.on('close', function (connection) {
        console.log('Connection Closed....');
        // close user connection
    });
});