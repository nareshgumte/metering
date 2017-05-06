/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var log = console.log.bind(console);

var http = require('http');

var host = 'localhost', http_port = process.argv[2] || 3434;

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var html = 'Hello baby';
    res.end(html);
});
server.on('message', function(d){
   console.log('Message receieved from server', d); 
});


server.listen(http_port);
