
import http from 'http';
import { createWriteStream } from 'fs';
import { basename, join } from 'path';

// Configuration
const HOST = '127.0.0.1';
const PORT = 3000;

//create HTTP server
const server = http.createServer((req, res) => {
    //extract filename from headers
    const filename = basename(req.headers['x-filename']);
    //define file path to save the uploaded file
    const filepath = join('C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\NodeJSDesignPatternsChapter6\\Exercises\\received-files', filename);
    //pipe the incoming request data to a file write stream
    req
    .pipe(createWriteStream(filepath))
    //finish event when file is fully written
    .on('finish', () => {
        //send response to client
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        //end response
        res.end('File received successfully\n');
        console.log(`File ${filename} received and saved to ${filepath}`);
    });
});
//start server
server.listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`);
});