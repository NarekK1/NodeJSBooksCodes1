import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//define the path to the directory we want to remove
const p = path.join(__dirname, 'folder2', 'folder3');

//use an immediately invoked async function expression to remove the directory
(async function(){
    //try to remove the directory and log the result
    try{
        //remove the directory using promises
        await fs.promises.rmdir(p);
        //log a success message
        console.log('Directory removed successfully');
    }
    //catch any errors that occur and log them
    catch(err){
        //log the error to the console
        console.error(err);
    }
})();