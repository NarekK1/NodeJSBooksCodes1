import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create a temporary directory using promises
(async function(){
    //create a temporary directory using the mkdtemp method and log the name of the directory
    try{
        //create a temporary directory in the current directory randomly named
        const name = await fs.promises.mkdtemp(path.join(__dirname + path.sep));
        //log the name of the directory
        console.log(name);
    }
    //handle any errors that may occur
    catch(err){
        //log the error to the console
        console.error(err);
    }
})();