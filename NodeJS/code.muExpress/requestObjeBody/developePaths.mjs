import express from 'express';

//create an instance of the express application
const app = express();

//define route handlers for different GET requests
app.get('/dir/page.html', function(req, res) {
    //log file path to the console
    console.log('Path:', req.path);
    //log the request URL
    console.log('URL', req.url);
    //log the original URL
    console.log('Original URL', req.originalUrl);
    //log the request query parameters
    console.log('Request Query', req.query);
    //log the request query parameters with a specific key
    console.log('Request First Query', req.query);
    //log the request protocol HTTP or HTTPS
    console.log('Protocol', req.protocol);
    //log whether the request is secure (HTTPS)
    console.log('Is protocol secure', req.secure);
    //log the request headers
    console.log('Request Headers', req.headers);
    //log the preferred languages of the client making the request
    console.log('Preferred Languages', req.acceptsLanguages());
    //log the IP address of the client making the request
    console.log('IP Address', req.ip);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});