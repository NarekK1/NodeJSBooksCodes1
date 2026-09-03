import fs from 'fs';
import path from 'path';
import iconv from 'iconv-lite';
import { fileURLToPath } from 'url';

//file path and directory setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the directory name with the file name to create the full path to the input and output fo;es
const p = path.join(__dirname, 'cp1251.txt');
//join the directory name with the file name to create the full path to the output file where the converted data will be written
const p2 = path.join(__dirname, 'utf8.txt');

//create a readable stream from the file and a writable stream to a new file
const rstream = fs.createReadStream(p);
//create a writable stream to the new file where the converted data will be written
const wstream = fs.createWriteStream(p2, { encoding: null });

//error event is emitted when an error occurs while reading from the stream or writing to the stream 
rstream.on('error', err => console.log("Error:", err));
//end event is emitted when there is no more data to be read from the stream
rstream.on('end', () => console.log('Operation complete'));

//pipe method is used to connect the readable stream
rstream.pipe(iconv.decodeStream('win1251'))
.pipe(iconv.encodeStream('utf8'))
.pipe(wstream);