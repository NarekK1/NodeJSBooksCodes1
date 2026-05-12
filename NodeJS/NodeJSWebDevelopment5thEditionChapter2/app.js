// Load the http module to create an HTTP server.
const http = require('http');
//create an HTTP server that listens on port 8124 and responds with "Hello, World!" to any incoming requests
http.createServer(function(req, res){
    //sets the response header to indicate that the content type is plain text and sends the response body "Hello, World!" to the client
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!\n');
}).listen(8124, '127.0.0.1');
//logs a message to the console indicating that the server is running and listening on the specified address and port
console.log('Server running at http://127.0.0.1:8124/');