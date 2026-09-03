import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the path of source and destination
const srcPath = path.join(__dirname, 'file1.txt');
//join the path of source and destination to copy the file in folder1 with new name file_5.txt
const destPath = path.join(__dirname, 'folder1', 'file_5.txt');

//copy the file asynchronously
fs.copyFile(srcPath, destPath, fs.constants.COPYFILE_EXCL, function(err){
    //if the file already exists, it will throw an error because of the flag COPYFILE_EXCL
    if(err){
        //log the error message and return from the function
        return console.error(err.message);
    }
    //log the success message if the file is copied successfully
    console.log('File copied successfully ');
});

console.log('End of program');