import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//current path directory
const __filename = fileURLToPath(import.meta.url);
//current directory name
const __dirname = path.dirname(__filename);

//join the current directory with 'test.txt' to create the full path for the output file
const p = path.join(__dirname, 'test.txt');
//create a write stream with options to emit close event when the stream is closed
const stream = fs.createWriteStream(p, { emitClose: true });

//ready event is emitted when the stream is ready to be used
stream.on('ready', () => console.log('Event is ready'));
//finish event is emitted when all data has been flushed to the underlying system
stream.on('finish', () => console.log('Event finish. Written:', stream.bytesWritten));
//close event is emitted when the stream and any of its underlying resources (like a file descriptor) have been closed.
stream.on('close', () => console.log('Event closed'));
//drain event is emitted when the internal buffer is empty and it's safe to write more data to the stream
stream.on('drain', () => console.log('Event drain'));
//error event is emitted when an error occurs while writing to the stream
stream.on('error', err => console.log('Error:', err));

//write 100 lines of text to the stream, each line containing "String" followed by the line number
for(let i = 1; i <= 100; i++){
    stream.write(`String${i}\n`);
}

//end the stream, which will also trigger the 'finish' event and eventually the 'close' event when the stream is fully closed
stream.end();