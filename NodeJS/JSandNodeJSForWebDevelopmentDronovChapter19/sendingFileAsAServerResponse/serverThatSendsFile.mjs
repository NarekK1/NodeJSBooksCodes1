import fs from 'fs';
import http from 'http';

// Create a simple HTTP server that serves an HTML file as a response that logs the request URL to the console
const server = http.createServer(function(req, res){
    //log the request URL to the console
    console.log(req.url);
    //set the response header to indicate that the content type is HTML
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    //check if the request URL is the root path
    if(req.url === '/'){
        //create a readable stream from the HTML file and pipe it to the response
        const stream = fs.createReadStream('index.html');
        //pipe the readable stream to the response
        stream.pipe(res);
        //handle any errors that occur while reading the file
        stream.on('error', err => {
            //status code 500 indicates an internal server error         
            res.statusCode = 500;
            //send an error message as the response
            res.end('<h1>Error</h1>');
        });
    }
    //if the request URL is not the root path, send a 404 Not Found response
    else{
        //status code 404 indicates that the requested resource was not found
        res.statusCode = 404;
        //send a Not Found message as the response
        res.end('<h1>Not Found</h1>');
    }
});

// Start the server and listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});