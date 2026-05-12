
import http from 'http';
const PORT = 3000;
const server = http.createServer((req, res) => {
  
  //we can set 100 status code for 'checkExpectation' event to close sending response
  res.writeHead(417, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(PORT, function(){
  console.log(`Server listening on: http://localhost:${PORT}/`)
});;

server.on('checkExpectation', (req, res) => {
  res.writeHead(417, { 'Content-Type': 'text/plain' });
});
