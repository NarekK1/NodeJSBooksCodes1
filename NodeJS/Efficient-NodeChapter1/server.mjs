//imports createServer from the http module ESM syntax
import { createServer } from 'http';

//create and export the server
export const server = createServer((req, res) => {
    //set the response header and send a response
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    //end the respionse with "Hello World"
    res.end("Hello World");
})