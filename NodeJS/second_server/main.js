//import the http module
const http =  require('http');
//import the http-status-codes module
const httpStatus = require('http-status-codes');
//define the port number 3000
const port = 3000;
//create an instance of the http server
const app = http.createServer();
//set up the request event listener
app.on('request', function(req, res){
    var body = [];
        const getJSONString = obj => JSON.stringify(obj, null, 2);
    //data event listener to collect the request body data
    req.on("data", bodyData => body.push(bodyData));
    //end event listener to process the complete request body
    res.on("end", function(){
        body = Buffer.concat(body).toString();
        console.log(`Request Body Contents: ${body}`);
    });
 //function to convert a JavaScript object to a JSON string
    console.log(`Method: ${getJSONString(req.method)}`);
    //url of the request
    console.log(`URL: ${getJSONString(req.url)}`);
    //headers of the request
    console.log(`Headers: ${getJSONString(req.headers)}`);
    res.writeHead(httpStatus.OK, {"Content-Type": "text/html"});
    let responseMessage = "<h1>This will show on the screen.</h1>";
    //log request details to the console
    // console.log(req.method);
    //log the request url and headers
    // console.log(req.url);
    //log all the request headers
    // console.log(req.headers);
     //send the response message to the client
    res.end(responseMessage);
});
//start the server and listen on port 3000
app.listen(port);
//log a message to the console indicating the server has started
console.log(`The server has started and is listening on port number: ${port}`);