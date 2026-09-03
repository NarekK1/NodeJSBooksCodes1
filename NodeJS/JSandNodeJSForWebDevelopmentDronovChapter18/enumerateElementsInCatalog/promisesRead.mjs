import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current directory and file name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create the path to the folder we want to read
const p = path.join(__dirname, 'folder1');

//use an async function to read the directory and log the first entry
(async function(){
    //open the directory
    try{
        //use the promises API to read the directory
        const dir = await fs.promises.opendir(p);

        //read the first entry
        const d = await dir.read();
        
        //check if the entry exists and log its name
        if(d){
            //log the name of the first entry
            console.log(d.name);
        }

        //close the directory
        await dir.close();
    }
    //catch any errors that occur
    catch(err){
        //log the error to the console
        console.error(err);
    }
})();