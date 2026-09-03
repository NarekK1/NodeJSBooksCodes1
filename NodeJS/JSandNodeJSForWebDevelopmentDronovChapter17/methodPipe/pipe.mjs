import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

//file path and directory setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the directory name with the file name to create the full path to the input and output files
const p = path.join(__dirname, 'test.txt');
//join the directory name with the file name to create the full path to the output file where the compressed data will be written
const p2 = path.join(__dirname, 'test.txt.gz');

//create a readable stream from the file and a writable stream to a new file
const rstream = fs.createReadStream(p);
//create a writable stream to the new file where the compressed data will be written
const wstream = fs.createWriteStream(p2);

//pipe event is emitted when a readable stream is piped to a writable stream
wstream.on('pipe', src => console.log('Flow connected'));

//error event is emitted when an error occurs while reading from the stream or writing to the stream
rstream.on('error', err => console.log('Error:', err));
//end event is emitted when there is no more data to be read from the stream, indicating that the operation is complete
rstream.on('end', () => console.log('Operation complete'));

//create a gzip transform stream to compress the data from the readable stream before writing it to the writable stream
const zstream = zlib.createGzip();

//pipe method is used to connect the readable stream to the gzip transform stream and then to the writable stream.
rstream.pipe(zstream).pipe(wstream, { end: true });