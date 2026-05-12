const http = require('http');
const url = require('url');
const util = require('util');

//get the url from the command line arguments
const argUrl = process.argv[2];
//parse the url and extract the hostname, port, path, and query parameters
const parsedUrl = url.parse(argUrl, true);

//create an options object for the http request, which includes the hostname, port, path, and method
const options = {
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.pathname,
    method: 'GET'
};

//if the parsed url contains search parameters, append them to the path in the options object
if(parsedUrl.search){
    //append the search parameters to the path in the options object
    options.path += `?${parsedUrl.search}`;
}

//make an http request using the options object and handle the response and any errors that may occur
const req = http.request(options);

//handle the response from the server by logging the status code, headers and body of the response
req.on('response', res => {
    //log the status code and headers of the response
    console.log(`STATUS: ${res.statusCode}`);
    //log the headers of the response using util.inspect to format the output
    console.log(`HEADERS: ${util.inspect(res.headers)}`);
    //set the encoding of the response data to 'utf8'
    res.setEncoding('utf8');
    //log the body of the response as it is received in chunks
    res.on('data', chunk => console.log(`BODY: ${chunk}`));
    //handle any errors that occur while receiving the response
    res.on('error', err => console.log(`RESPONSE ERROR: ${err}`));
});

//handle any errors that occur while making the request
req.on('error', err => console.log(`REQUEST ERROR: ${err}`));
//end the request to send it to the server
req.end();