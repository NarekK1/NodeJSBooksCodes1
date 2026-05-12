import fs from 'fs';
import { createServer } from 'http';
import { Readable } from 'stream';
import url from 'url';

//create a server that demonstrates various ways to use readable streams with files
const server = createServer(async (req, res) => {
    //parse the URL to determine which demo to run
    const { pathname } = url.parse(req.url || '/');

    // Example: stream a file directly to response using pipe
    if (pathname === '/pipe') {
        //this is the most common way to use a readable stream with a file: create a read stream and pipe it to the response
        const readStream = fs.createReadStream('./sample.txt');
        //set the content type to application/pdf
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        //pipe the read stream to the response
        readStream.pipe(res);
        //close the stream when done
        return;
    }

    // Example: use Readable.wrap to wrap an existing readable-like stream
    // (wrap is a helper for older "streams2" style streams)
    if (pathname === '/wrap') {
        //create a read stream for the file, then wrap it in a Readable stream
        const oldStream = fs.createReadStream('./sample.txt');
        //wrap the old stream in a new Readable stream
        const wrapped = new Readable({ read() {} }).wrap(oldStream);
        //set the content type to application/pdf
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        //pipe the wrapped stream to the response
        wrapped.pipe(res);
        //close the stream when done
        return;
    }

    // Example: manually read from stream using read() and the 'readable' event
    if (pathname === '/read') {
        //create a read stream for the file
        const readStream = fs.createReadStream('./sample.txt');
        //set the content type to application/octet-stream for generic binary data
        res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        //listen for the 'readable' event to know when data is available to read
        readStream.on('readable', () => {
            //read chunks of data until the internal buffer is empty
            let chunk;
            // call read() to pull data from internal buffer
            while (null !== (chunk = readStream.read(64 * 1024))) {
                //write the chunk to the response
                res.write(chunk);
            }
        });
        //when the stream ends, end the response
        readStream.on('end', () => res.end());
        //close the stream when done
        return;
    }

    // Example: pause() and resume() to control flow
    if (pathname === '/pause') {
        //create a read stream for the file
        const readStream = fs.createReadStream('./sample.txt');
        //set the content type to application/pdf
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

        //listen for 'data' events to receive chunks of data
        readStream.on('data', (chunk) => {
           //write the chunk to the response
            res.write(chunk);
             // Pause the stream after first chunk, resume after 1s
            readStream.pause();
            setTimeout(() => readStream.resume(), 1000);
        });
        //when the stream ends, end the response
        readStream.on('end', () => res.end());
         // Pause the stream after first chunk, resume after 1s
        return;
    }

    // Example: destroy() to terminate the stream early
    if (pathname === '/destroy') {
        //create a read steam for the file
        const readStream = fs.createReadStream('./sample.txt');
        //set the content type to application/pdf
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        // Destroy after 100KB has been sent
        let sent = 0;
        //listen for 'data' events to receive chunks of data
        readStream.on('data', (chunk) => {
            //write the chunk to the response and track how much has been sent
            sent += chunk.length;
            //write the chunk to the response
            res.write(chunk);
            //if we've sent more than 100KB, destroy the stream and end the response
            if (sent > 100 * 1024) {
                //destroy the stream to stop reading more data
                readStream.destroy();
                //end the response with a message indicating the stream was destroyed
                res.end('stream destroyed early');
            }
        });
        //handle any errors that occur on the stream
        readStream.on('error', (err) => {
            // When destroyed, an error may be emitted; handle it
            console.error('stream error:', err && err.message);
        });
        //close the stream when done
        return;
    }

    // Example: setEncoding() to receive strings instead of Buffer
    if (pathname === '/encoding') {
        //create a read stream for the file
        const readStream = fs.createReadStream('./sample.txt');
        //set the encoding to utf8 so we get strings instead of Buffer objects
        readStream.setEncoding('utf8');
        //set the content type to text/plain with utf-8 charset
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        //listen for 'data' events to receive chunks of data as strings
        readStream.on('data', (chunk) => res.write(chunk));
        //when the stream ends, end the response
        readStream.on('end', () => res.end());
        //close the stream when done
        return;
    }

    // Example: unshift() — push data back onto the internal buffer
    if (pathname === '/unshift') {
        // Build a small custom Readable stream for demonstration
        const r = new Readable({ read() {} });
        //push some data onto the stream, then unshift a line to be read first
        r.push('SECOND_LINE\n');
        // now FIRST_LINE will be read first
        r.unshift('FIRST_LINE\n'); 
        //set the content type to text/plain with utf-8 charset
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        //pipe the stream to the response
        r.pipe(res);
        //push null to signal the end of the stream
        r.push(null);
        //close the stream when done
        return;
    }

    // Default: show available endpoints
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    //end the response with a list of available demos
    res.end([
        'Available demos:',
        '/pipe',
        '/wrap',
        '/read',
        '/pause',
        '/destroy',
        '/encoding (uses sample.txt)',
        '/unshift',
    ].join('\n'));
});

//start the server on port 3000 and log a message when it's running
server.listen(3000, () => console.log('server running on http://localhost:3000'));

// Notes:
// - Replace './200mb.pdf' and './sample.txt' with files that exist in this folder.
// - These endpoints demonstrate: pipe, wrap, read, pause/resume, destroy, setEncoding, and unshift.