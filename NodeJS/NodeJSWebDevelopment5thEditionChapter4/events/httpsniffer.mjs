import * as util from 'util';
import * as url from 'url';


//timestamp function to return the current time in ISO format
const timestamp = () => new Date().toISOString();

//sniffOn is a function that takes a server as an argument and adds event listeners to it to log requests and other events
export function sniffOn(server){
    //add event listeners to the server to log requests and other events
    server.on('request', (req, res) => {
        //log the request to the console with a timestamp
        console.log(`${timestamp()} request`);
        //log the request to the console with a timestamp and the request details
        console.log(`${timestamp} ${reqToString(req)}`);
    });
    //log the close event to the console with a timestamp and the error number
    server.on('close', errno => console.log(`${timestamp()} close errno=${errno}`));
    //log the checkContinue event to the console with a timestamp and the request details, and send a 100 Continue response
    server.on('checkContinue', (req, res) => {
        console.log(`${timestamp()} checkContinue`);
        //log the request to the console with a timestamp and the request details
        console.log(`${timestamp()} ${reqToString(req)}`);
        //send a 100 Continue response to the client
        res.writeContinue();
    });
    //log the upgrade event to the console with a timestamp and the request details
    server.on('upgrade', (req, socket, head) => {
        //log the upgrade event to the console with a timestamp
        console.log(`${timestamp()} upgrade`);
        //log the request to the console with a timestamp and the request details
        console.log(`${timestamp()} ${reqToString(req)}`);
    });
    //log the clientError event to the console with a timestamp
    server.on('clientError', () => console.log('clientError'));

};
//function to convert a request object to a string for logging purposes
export function reqToString(req){
    //start with the request method, HTTP version, and URl
    let ret = `request ${req.method} ${req.httpVersion} ${req.url}` + '\n';
    //log the request details to the console with a timestamp and the request details
    ret += JSON.stringify(url.parse(req.url, true)) + '\n';
    //log the request headers to the console with a timestamp and the request details
    let keys = Object.keys(req.headers);
    //loop through the request headers and log them to the console with a timestamp and the request details
    for(let i = 0; i < keys.length; i++){
        //get the key and value of the request header
        let key = keys[i];
        //log the request header to the console with a timestamp and the request details
        ret += `${i} ${key}: ${req.headers[key]}` + '\n';
    }
    //check if the request has trailers and log them to the console with a timestamp and the request details
    if(req.trailers){
        //util.inspect the request trailers and return the result
        ret += util.inspect(req.trailers) + '\n';
        return ret;
    }
}
