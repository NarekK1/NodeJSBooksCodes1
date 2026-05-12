//require the http module CommonJS syntax
const { createServer } = require('http');
//create a server
const server = createServer((req, res) => {
    //set the response header and send a response
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    //end the response
    res.end('Hello, World');
});

//start the server and listen on port 3000 and localhost
server.listen(3000, '127.0.0.1', () => {
    //log a message to the console when the server is running
    console.log('Server is running...');
})