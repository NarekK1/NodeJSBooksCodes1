import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = path.dirname(__filename);

//join the directory path with the file name to get the full path of the file
const p = path.join(__dirname, 'file7.txt');

//write to the file using fs.promises.writeFile and log a message when the file is written successfully or if there is an error
fs.promises.writeFile(p, 'String1', 'utf8').then(function(){
    //log the message to the console
    console.log('File written successfully');
}, function(err){
    console.log(err.message);
});

console.log('End of the program')