import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname and __filename are not available in ES modules, so we need to create them manually
//get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
//get the current directory path
const __dirname = path.dirname(__filename);

//create a write stream to the file 'test.txt' in the current directory
const p = path.join(__dirname, './test.txt');
//create a write stream to the file 'test.txt' in the current directory
const stream = fs.createWriteStream(p);

//handle errors and finish events
stream.on('error', err => console.log('Error:', err));
//when the stream finishes writing, log a message to the console
stream.on('finish', () => console.log('Data written successfully!'));

//write some data to the stream
stream.write('String1\n');
//write another string to the stream
stream.write('String2');

console.log('End of the program');