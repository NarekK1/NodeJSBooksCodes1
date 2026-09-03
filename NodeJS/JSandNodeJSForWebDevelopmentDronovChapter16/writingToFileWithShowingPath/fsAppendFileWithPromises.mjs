import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

//writing to file with showing path 
const __filename = fileURLToPath(import.meta.url);
//dirname is the directory name of the current module file
const __dirname = path.dirname(__filename);

//using appendFile method to add content to the file
const p = path.join(__dirname, 'file8.txt');

//using promises to handle the asynchronous operation of appending data to the file
fs.promises.appendFile(p, 'String1', 'utf8').then(function() {
    console.log('Data appended to file successfully');
},function(err){
    console.error(err.message);
});

console.log('End of the program');