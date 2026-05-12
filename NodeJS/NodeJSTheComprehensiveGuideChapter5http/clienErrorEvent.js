import http from 'http';
const PORT = 3000;
const server = http.createServer(function(req, res){
    res.end();
}).listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}/`);
});
server.on('clientError', function(err, socket) {
    if(err){
        console.log(err);
    }
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});