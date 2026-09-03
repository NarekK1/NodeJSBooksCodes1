import http from 'http';

//create a server that responds to different requests
const server = http.createServer(function(req, res){
    //set the response header
    if(req.url === '/' || req.url === '/test'){
        //set the response header
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        //set the response body
        res.write('<h1>/ or /test </h1>');
        //end the response
        res.end();
    }
    //set the response header and body for /about request
    else if(req.url === '/about'){
        //set the response header
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        //set the response body
        res.write('<h1>/about</h1>');
        //end the response
        res.end();
    }
    //if the request is not for /, /test or /about, return a 404 error
    else{
        //set the response header
        res.statusCode = 404;
        //end the response with a 404 error message
        res.end('<h1>Not Found</h1>');
    }
});

//start the server and listen on port 3000
server.listen(3000, () => {
    //log a message to the console when the server is running
    console.log('Server is running on port 3000');
});