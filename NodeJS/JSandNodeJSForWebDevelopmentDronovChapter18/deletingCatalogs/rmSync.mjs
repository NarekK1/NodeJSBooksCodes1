import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current directory name and file name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//delete the folder synchronously recursive means that it will delete the folder and all its contents 
try{  
    //delete the folder synchronously  
    fs.rmSync(path.join(__dirname, 'folder4'), { recursive: true });
    //if the folder was deleted successfully, it will log a message to the console
    console.log('folder was deleted successfully');
}
//if there was an error deleting the folder, it will log the error to the console
catch(err){
    //log the error to the console
    console.error(err);
}