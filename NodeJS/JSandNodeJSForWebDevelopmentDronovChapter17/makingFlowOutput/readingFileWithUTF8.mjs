import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file path and directory setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the current directory with 'test.txt' to create the full path for the input file
const p = path.join(__dirname, 'test.txt');
//create a read stream for the file at path 'p'
const stream = fs.createReadStream(p);

//set the encoding for the stream to 'utf8' so that the data is read as a string instead of a buffer
stream.setEncoding('utf8');

//data event is emitted when a chunk of data is available to read from the stream
stream.on('data', chunk => console.log(chunk));
//error event is emitted when an error occurs while reading from the stream
stream.on('error', err => console.log('Error:', err));