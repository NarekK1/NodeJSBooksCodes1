import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//to get the current file name and directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the old path and new path file names with the current directory name
const oldPath = path.join(__dirname, 'file4.txt');
const newPath = path.join(__dirname, 'file_4.txt');

//using an IIFE to use async/await for renaming the file
(async function(){
    //renaming the file using fs.promises.rename() method which returns a promise
    try{
        //await the promise to resolve and rename the file 
        await fs.promises.rename(oldPath, newPath);
        //if the promise is resolved successfully, log a success message
        console.log('File renamed successfully');
    }
    //if the promise is rejected, catch the error and log the error message
    catch(err){
        //log the error message if the promise is rejected
        console.error(err.message);
    }
})();

//log end of the program message to show that the program has finished executing
console.log('End of the program');