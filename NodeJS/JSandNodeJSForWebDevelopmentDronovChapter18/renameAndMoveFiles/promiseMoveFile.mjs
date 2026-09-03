import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//to get the current file name and directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the old path and new path file names with the current directory name
const oldPath = path.join(__dirname, 'file_4.txt');
//join the new path with the folder name and file name to move the file to a different folder
const newPath = path.join(__dirname, 'folder1', 'file_4.txt');

//using an IIFE to use async/await for moving the file
(async function(){
    //moving the file using fs.promises.rename() method which returns a promise
    try{
        //await the promise to resolve and move the file to the new location
        await fs.promises.rename(oldPath, newPath);
        //if the promise is resovled successfully, log a success message
        console.log('File moved successfully');
    }
    //if the promise is rejected, catch the error and log the error message
    catch(err){
        //log the error message if the promise is rejected
        console.error(err.message);
    }
})();