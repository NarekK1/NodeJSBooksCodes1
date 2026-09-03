import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//path of the file to be deleted
const p = path.join(__dirname, 'folder1', 'file_5.txt');

//delete the file asynchronously
fs.rm(p, function(err){
    //handle error
    if(err){
        //print error message and return
        return console.error(err.message);
    }
    //log success message
    console.log('File deleted successfully');
});

console.log('End of program');