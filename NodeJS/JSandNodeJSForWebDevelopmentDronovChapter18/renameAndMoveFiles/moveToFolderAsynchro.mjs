import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//define the old path
const oldPath = path.join(__dirname, 'file_3.txt');
//define the new path
const newPath = path.join(__dirname, 'folder1', 'file_3.txt');

//move the file from old path to new path
fs.rename(oldPath, newPath, function(err){
    //handle error if any
    if(err){
        //log the error message to the console
        return console.error(err.message);
    }
    //log success message to the console
    console.log('File moved successfully');
});