import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the path to the file to be deleted
const p = path.join(__dirname, 'folder1', 'file_5.txt');

//delete the file using unlink method
fs.unlink(p, function(err){
    //check for errors during deletion
    if(err){
        //log the error message and return from the function
        return console.error(err.message);
    }
    //log success message if the file is deleted successfully
    console.log('File deleted successfully');
});

console.log('End of program');