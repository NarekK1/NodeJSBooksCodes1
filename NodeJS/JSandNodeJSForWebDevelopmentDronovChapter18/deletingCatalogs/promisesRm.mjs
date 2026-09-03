import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//define the path to the folder to be deleted
const p = path.join(__dirname, 'folder2', 'folder3');

//delete the folder using promises
(async function(){
      //delete the folder and log the result
     try{
    //delete the folder and all its contents recursively
    await fs.promises.rm(p, { recursive: true });
    //log the success message
    console.log('Deleted successfully');
   }
   //handle any errors that occur during deletion
   catch(err){
    //log the error message
    console.error(err);
   }
})();