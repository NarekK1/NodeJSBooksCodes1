//import the createServer function from the 'http' module
import { createServer } from 'http';
 
console.log('createServer');
//create a server instance
const server = createServer(function(request, response){
    console.log('createServer callback');
    //set the response HTTP header with HTTP status and content type
    response.writeHead(200, {'content-type':'text/html; charset=utf-8'});
    //parse the request URL
    const url = new URL(request.url, 'http://localhost:8080');
    console.log(url);
    //log the request URL
    console.log('Name:', url.searchParams.get('name'));
    
    //send a plain text response with 200(succesfull) status code
    // response.writeHead(200, {'content-type':'text/plain; charset=utf-8'});
    //write "Hello " to the response body
    // response.write("Hello ");
    //end the response with "World\n"
    // response.end("World\n");
    //send an HTML response
    const body = `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>Node.js Demo</title>
    </head>
    <body>
    <h1 style="color:green">Hello ${url.searchParams.get('name')}</h1>
    </body>
    </html>`;
    //end the response with the HTML body
    response.end(body);
    
});
console.log('listen');
//listens to port 8080 and logs a message when the server is running
server.listen(8080, function(){
    //log the server address and port
    console.log(`Server is listening to http://localhost:${server.address().port}`);
});