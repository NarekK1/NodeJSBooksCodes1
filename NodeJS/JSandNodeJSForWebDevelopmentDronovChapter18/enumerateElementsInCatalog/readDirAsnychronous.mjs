import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

//get the current file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the current directory with the folder name to get the path to the folder
const p = path.join(__dirname, 'folder1');

//read the contents of the folder asynchronously and log the result to the console
fs.readdir(p, 'buffer', function(err, arr){
    //if there is an error, throw it
    if(err){
        //log the error to the console
        throw err;
    }
    //log the array of file names to the console
    console.log(arr);
});