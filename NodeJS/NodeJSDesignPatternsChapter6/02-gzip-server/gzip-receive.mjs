import { createServer } from 'http';
import { createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { basename, join } from 'path';

//create an HTTP server to receive gzipped files
const server = createServer((req, res) => {
    //extract filename from headers
    const filename = basename(req.headers['x-filename']);
    //define destination path
    const destFilename = join('received_files', filename);
    //log the incoming request
    console.log(`File request received: ${filename}`);
    //pipe the request through gunzip and write to destination file
    req.pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    //finish event to log success message and respond to client
    .on('finish', () => {
        res.writeHead(201, {'Content-Type': 'text/plain'});
        res.end('OK\n');
        //log success message
        console.log(`File saved: ${destFilename}`);
    })
})
//start the server on port 3000
server.listen(3000, () => console.log('Listening on http://localhost:3000'));