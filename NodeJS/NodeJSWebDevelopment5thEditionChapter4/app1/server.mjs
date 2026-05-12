import * as http from 'http';
import * as util from 'util';
import * as os from 'os';
import { sniffOn } from '../events/httpsniffer.mjs';

// This is a simple HTTP server that serves two pages:
const listenOn = 'http://localhost:8124';
// create the server and listen to requests on port 8124
const server = http.createServer();

//when a request is recieved, check the URL and serve the appropriate page
server.on('request', (req, res) => {
    //parse the URL to get the pathname
    const requrl = new URL(req.url, listenOn);
    //check the pathname and serve the appropriate page
    if(requrl.pathname === '/'){
        //serve the homepage
        homepage(req, res);
    }
    //if the pathname is /osinfo, serve the osinfo page
    else if(requrl.pathname === '/osinfo'){
        osInfo(req, res);
    }
    //if the pathname is anything else, serve a 404 page
    else{
        //serve a 404 page
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        //end the response with a message
        res.end('bad URL' + req.url);
    }
});

//start the server and listen to requests on port 8124
server.listen(new URL(listenOn).port);
//add event listeners to the server to log requests and other events
sniffOn(server);
//log a message to the console to indicate that the server is running
console.log(`listening to ${listenOn}`);

//function to serve the homepage
function homepage(req, res){
    //set the response header to indicate that the content is HTML
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //end the response with the HTML content for the homepage
    res.end(
`<html><head><title>Hello, world!</title></head>
 <body><h1>Hello, world!</h1>
 <p><a href='/osinfo'>OS Info</a></p>
 </body></html>`
    )
};

//function to serve the osinfo page
function osInfo(req, res){
    //set the response header to indicate that the content is HTML
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //end the response with the HTML content for the osinfo page, which includes information about the operating system using the os module
    res.end(
        `<html><head><title>Operating System Info</title></head>
 <body><h1>Operating System Info</h1>
 <table>
 <tr><th>TMP Dir</th><td>${os.tmpdir()} </td> </tr>
  <tr><th>Host Name</th><td>${os.hostname()}</td></tr>
   <tr><th>OS Type</th><td>${os.type()} ${os.platform()} ${os.arch()} ${os.release()}</td></tr>
    <tr><th>Uptime</th><td>${os.uptime()} ${util.inspect(os.loadavg())}</td></tr>
    <tr><th>Memory</th><td>total: ${os.totalmem()} free: ${os.freemem()} </td></tr>
    <tr><th>CPU's</th><td><pre>${util.inspect(os.cpus())}</pre></td></tr>
    <tr><th>Network</th><td><pre>${util.inspect(os.networkInterfaces())}</pre></td></tr>
    </table>
 </body></html> `);
}