import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//delete a directory using the rmdirSync method and log a message to the console
try{
    //delete the directory named folder4 in the current directory
    fs.rmdirSync(path.join(__dirname, 'folder4'));
    //log a message to the console indicating that the folder was deleted successfully
    console.log('folder was deleted successfully');
}
//handle any errors that may occur
catch(err){
    //log the error to the console
    console.error(err);
}