import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file path and directory setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the current directory with 'test.txt' to create the full path for the input file
const p = path.join(__dirname, 'test.txt');
//create a readable stream with UTF-8 encoding to read the contents of 'test.txt'
const stream = fs.createReadStream(p, { encoding: 'utf8' });

//listen for 'data' events emitted by the stream and log each chunk of data to the console
stream.on('data', chunk => console.log(chunk));
//listen for 'error' events emitted by the stream and log any errors to the console
stream.on('error', err => console.log('Error:', err));