import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current directory name and file name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the current directory with the folder name to get the path to the folder
const p = path.join(__dirname, 'folder1');

//use an async function to read the contents of the folder and log it to the console
(async function(){
    //read the contents of the folder using the promises API and log it to the console
    try{
        //use the withFileTypes option to get an array of Dirent objects instead of just file name
        const arr = await fs.promises.readdir(p, { withFileTypes: true });
        //log the array of Dirent objects to the console
        console.log(arr);
    }
    //handle any errors that may occur and log them to the console
    catch(err){
        //log the error to the console
        console.log(err);
    }
})();