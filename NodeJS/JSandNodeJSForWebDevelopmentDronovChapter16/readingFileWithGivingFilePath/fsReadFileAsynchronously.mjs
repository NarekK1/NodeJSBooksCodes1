import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//construct the path to the file you want to read
const p  = path.join(__dirname, 'file1.txt');

//readd the file asynchronously
fs.readFile(p, 'utf8', function(err, str){
    //handle the error and print the content of the file
    if(err){
        console.log(err);
    }
    else{
        console.log(str);
    }
});

console.log('End of the program');