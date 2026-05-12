//chi ashxatym vonc petqa
import { error } from 'console';
import http from 'http';
const PORT = 3000;
const server = http.createServer(function(req, res){
    res.writeHead(200, {'content-type': 'text/plain'});
    res.end('');
}).listen(PORT, function(){
    console.log(`Server listening on: http://localhost:${PORT}/`)
});
server.on('upgrade', function(req, socket, head){
    if(req.headers.upgrade === 'websocket'){
        socket.pipe("Ok!");
        socket.write('everything is ok');
        console.log("Upgraded to WebSocket");
        res.end('everything is ok');
    }
    else{
        res.write('HTTP/1.1 400 Bad Request\r\n\r\n');
        socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
        console.log("1 2 3  Allahu Akbar BOOM!!!");
        res.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    }

});