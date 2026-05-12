const http = require('http');

//a series of requests to the server to test the caching of results
const options = [
  "/fibonacci/30", "/fibonacci/20", "/fibonacci/10",
  "/fibonacci/9", "/fibonacci/8", "/fibonacci/7",
  "/fibonacci/6", "/fibonacci/5", "/fibonacci/4",
  "/fibonacci/3", "/fibonacci/2", "/fibonacci/1"
];
//make the requests in series to better demostrate the caching
options.forEach((path) => {
    //log the request time and path
    console.log(`${new Date().toISOString()} requesting ${path}`);
    //make the request to the server
    let req = http.get({
        //use the environment variable for the port, default to 3002 if not set
        hostname: 'localhost',
        port: process.env.SERVERPORT,
        path,
        method: 'GET'
    }, res => {
        //log the response status code and headers
        res.on('data', chunk => {
            //log the response body and data time
            console.log(`${new Date().toISOString} BODY: ${chunk}`);
        });
    });
    //end the request
    req.end();
})