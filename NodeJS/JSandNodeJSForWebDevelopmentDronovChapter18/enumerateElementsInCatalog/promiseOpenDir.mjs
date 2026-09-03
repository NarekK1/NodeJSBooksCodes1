import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the current directory with the folder name to get the path to the folder
const p = path.join(__dirname, 'folder1');

//use an async IIFE to open the directory and enumerate its contents
(async function(){
    //get a directory and iterate over its contents
    try{
        //use the promise version of opendir to get a directory object
        const dir = await fs.promises.opendir(p);
        //use a for await...of loop to iterate over the directory entries
        for await(const d of dir){ 
            //log the name of each directory entry
            console.log(d.name);
        }
    }
    //catch any errors that occur and log them to the console
    catch(err){
        //log the error to the console
        console.error(err);
    }
})();