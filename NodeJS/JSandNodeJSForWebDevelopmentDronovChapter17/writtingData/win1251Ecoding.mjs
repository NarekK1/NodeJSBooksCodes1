import fs from 'fs';
import iconv from 'iconv-lite';
import path from 'path';
import { fileURLToPath } from 'url';

//file path and directory setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the current directory with 'cp1251.txt' to create the full path for the output file
const p = path.join(__dirname, 'cp1251.txt');

//create a write stream with options to use null encoding, which allows us to write raw binary data
const stream = fs.createWriteStream(p, { encoding: null });

//handle errors and finish events for the stream
stream.on('error', err => console.log('Error:', err));
stream.on('finish', () => console.log('Finished writing to file.'));

//encode a string using the 'win1251' encoding and write the raw binary data to the stream
const data = iconv.encode('String1', 'win1251');
stream.write(data);

//end the stream, which will also trigger the 'finish' event
stream.end();