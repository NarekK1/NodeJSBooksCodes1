const http = require('http');
// Define a port to listen on 3000
const port = 3000;
// Import the http-status-codes module
const httpStatus = require("http-status-codes");
// Create a server using the http module
const app = http.createServer(function(request, response){
    // Log that we received a request
    console.log("Recieved an icoming request!");
    // Send a response with status code 200 (OK) and content type text/html
    response.writeHead(httpStatus.OK, {"Conetent-Type": "text/html"});
    // Write a simple HTML message to the response body
    let responseMessage = "<h1>Hello, Universe!</h1>";
    // Send the response
    response.write(responseMessage);
    // End the response
    response.end();
    // Log that we sent a response
    console.log(`Sent a response: ${responseMessage}`);
});
app.listen(port);
console.log(`The server has started and is listenting on port number: ${port}`)