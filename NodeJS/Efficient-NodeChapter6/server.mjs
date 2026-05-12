import { createServer } from 'http';
import { createReadStream } from 'fs';

//create a server and send a big file to the client using streams
const server = createServer();

//when the client makes a request, create a read stream for the big file and pipe it to the response
server.on('request', (req, res) => {
    //set the content type to application/octet-stream
    const src = createReadStream('./200mb.pdf');
    //pipe the read stream to the response
    src.pipe(res);
});

//start the server on port 3000
server.listen(3000, () => {
    //log a message to the console when the server is running
    console.log('Server is running...');
})