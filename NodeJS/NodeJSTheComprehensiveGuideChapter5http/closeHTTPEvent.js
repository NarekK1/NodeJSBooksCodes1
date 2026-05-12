import http from 'http';
const port = 3000;
const server = http.createServer(function(req, res){
    res.writeHead(200, {'content-type': 'text/plain'});
    res.end('ended');
}).listen(port, function(){
    console.log(`Listening to port ${port}`);
});
setTimeout(function(){
    server.close(function(){
        console.log(`server on port ${port} closed successfully`);
    })
}, 5000);