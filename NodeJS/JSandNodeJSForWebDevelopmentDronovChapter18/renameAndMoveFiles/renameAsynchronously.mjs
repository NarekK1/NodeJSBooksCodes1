import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// To get the current directory name in ES modules, we need to use the fileURLToPath and path.dirname functions.
const __filename = fileURLToPath(import.meta.url);
//get the directory name of the current module
const __dirname = path.dirname(__filename);

//join the current directory with the file name to get the full path of the file to be renamed
const oldPath = path.join(__dirname, 'file3.txt');
//join the current directory with the new file name to get the full path of the new file
const newPath = path.join(__dirname, 'file_3.txt');

//asynchronously rename the file using fs.rename. The callback function will be called once the operation is complete.
fs.rename(oldPath, newPath, function(err){
    //handle errors
    if(err){
        //log the error message to the console and return to exit the function
        return console.error(e.message);
    }
    //log a success message to the console if the file was renamed successfully
    console.log('File renamed successfully');
});

console.log('End of the program.');