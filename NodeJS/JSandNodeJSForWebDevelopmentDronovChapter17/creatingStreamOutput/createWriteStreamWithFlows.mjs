import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file path and directory setup for ES modules
const __filename = fileURLToPath(import.meta.url);
//directory path for the current file
const __dirname = path.dirname(__filename);

//create a write stream to 'test.txt' with specific options
const p = path.join(__dirname, 'test.txt');

//create a write stream with options to append data and use UTF-8 encoding
const stream = fs.createWriteStream(p, {
    //appen data to the file instead of overwriting it
    flags: 'a',
    //specify the encoding for the stream
    encoding: 'utf8'
});

//handle errors and finish events for the stream
stream.on('error', err => console.log('Error:', err));
stream.on('finish', () => console.log('Finished writing to file.'));

//write some data to the stream
stream.write('\nString3\n');

//end the stream with a final string, which will also trigger the 'finish' event
stream.end('String4');