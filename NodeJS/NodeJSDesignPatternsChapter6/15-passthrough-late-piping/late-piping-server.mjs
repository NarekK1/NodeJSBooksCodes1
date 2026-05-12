import { createServer } from 'http';
import { createWriteStream } from 'fs';
import { basename, join } from 'path';

//an HTTP server that recieves uploaded files
const server = createServer((req, res) => {
    //get the filename from the headers
    const filename = basename(req.headers['x-filename']);
    //path to save the file
    const destFilename = join('C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\NodeJSDesignPatternsChapter6\\15-passthrough-late-piping\\received_files', filename);
    //log the request and pipe the request data to a file
    console.log(`File request recieved: ${filename}`);
    //pipe the request data to a file
    req.pipe(createWriteStream(destFilename))
    //finish the response when the file is saved
    .on('finish', () => {
        //send a response back to the client
        res.writeHead(201, {'Content-Type': 'text/plain'});
        //indicate success and log Ok
        res.end('OK\n');
        //log that the file was saved
        console.log(`File saved: ${destFilename}`);
    })

})
//start the server and listen on port 3000
server.listen(3000, () => console.log('Listening on http://localhost:3000'));