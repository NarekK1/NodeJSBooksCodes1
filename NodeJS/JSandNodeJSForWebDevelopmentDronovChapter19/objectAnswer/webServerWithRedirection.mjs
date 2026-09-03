import http from 'http';

//create a server that responds to different requests
const server = http.createServer(function(req, res){
    //set the response header and body for / request and redirect to /test
    if(req.url === '/'){
        //set the response header
        res.statusCode = 302;
        //set the Location header to redirect to /test
        res.setHeader('Location', '/test');
        //close the response
        res.end();
    }
    //set the response header and body for /test request
    else if(req.url === '/test'){
        //set the response header
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        //write the response body
        res.write('<h1>/test</h1>');
        //close the response
        res.end();
    }
    //set the response header and body for any other request
    else{
        //set the response status code to 404 Not Found
        res.statusCode = 404;
        //end the response with a Not Found message
        res.end('<h1>Not Found</h1>');
    }
});

//start the server and listen to port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});