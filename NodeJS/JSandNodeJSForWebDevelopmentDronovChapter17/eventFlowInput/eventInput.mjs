import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file path and directory setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create a readable stream from a file and listen to various events emitted by the stream
const p = path.join(__dirname, 'test.txt');
//create a readable stream from the file with the option to emit 'close' event when the stream is closed
const stream = fs.createReadStream(p, { emitClose: true }); 

//open event is emitted when the stream is opened and ready to be read from
stream.on('open', fd => console.log('Event open. fd=', fd));
//ready event is emitted when the stream is ready to be read from, which may occur after the 'open' event
stream.on('ready', () => console.log('Event ready'));
//data event is emitted when a chunk of data is available to be read from the stream. 
stream.on('data', chunk => console.log('Event data'));
//readable event is emitted when there is data available to be read from the stream.
stream.on('readable', ()  => {
    console.log('Event readable');
    //read() method is called to read data from the stream.
    const chunk = stream.read();
});
//end event is emitted when there is no more data to be read from the stream
stream.on('end', () => console.log('Event end'));
//close event is emitted when the stream is closed, which can occur after the 'end' event or if the stream is destroyed.
stream.on('close', () => console.log('Event close'));
//error event is emitted when an error occurs while reading from the stream
stream.on('error', err => console.log('Error:', err));