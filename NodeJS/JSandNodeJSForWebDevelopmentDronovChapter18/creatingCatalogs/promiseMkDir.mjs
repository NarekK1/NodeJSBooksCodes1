import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current directory name and file name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the path to create a new folder
const p = path.join(__dirname, 'folder6', 'folder7');

//create the directory using promises and async/await
(async function(){
    //create the directory and log the result
    try{
        //create the directory and log the result to the console using the promise version of mkdir if the directory does not exist and if exist returns undefined
        const d = await fs.promises.mkdir(p, { recursive: true  });
        //log the result to the console
        console.log('Directory created successfully:', d);
    }
    //catch any errors that occur during the directory creation process and log them to the console
    catch(err){
        //log the error to the console
        console.error(err);
    }
})();