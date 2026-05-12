import { request } from 'http';
import { createGzip } from 'zlib';
import { createReadStream } from 'fs';
import { basename } from 'path';
//get filename and server host from command line arguments
const filename = process.argv[2];
//get server host from command line arguments
const serverHost = process.argv[3];

//define HTTP request options
const httpRequestOptions = {
    //hostname from command line argument
    hostname: serverHost,
    port: 3000,
    path: '/',
    //PUT method for file upload
    method: 'PUT',
    //set necessary headers
    headers: {
        
        'Content-Type': 'application/octent-stream',
        'Content-Encoding': 'gzip',
        'X-Filename': basename(filename)
    }
}
//create the HTTP request
const req = request(httpRequestOptions, (res) => {
    //log the server response status code
    console.log(`Server response: ${res.statusCode}`);
});
//handle request errors
createReadStream(filename)
//pipe the file through gzip and into the request
.pipe(createGzip())
.pipe(req)
//log success message on finish
.on('finish', () => console.log('File successfully sent'));