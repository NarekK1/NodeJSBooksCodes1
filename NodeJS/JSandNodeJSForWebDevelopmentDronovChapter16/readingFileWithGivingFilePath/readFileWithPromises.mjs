import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

//to get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the current directory with the file name to get the full path of the file
const p = path.join(__dirname, 'file1.txt');

//read the file using promises and log the content to the console
fs.promises.readFile(p, 'utf-8').then(function (str) {
    //log the content of the file to the console
    console.log(str);
}, function(err){
    console.error(err);
});

console.log('End of the program');