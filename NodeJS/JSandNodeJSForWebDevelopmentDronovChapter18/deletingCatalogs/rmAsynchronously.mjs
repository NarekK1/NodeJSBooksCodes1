import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//delete the folder and its contents asynchronously
fs.rm(path.join(__dirname, 'folder6'), { recursive: true }, function(err){
    //handle the error if any
    if(err){
        //log the error and throw it 
        throw err;
    }
    //log the success message
    console.log('Folder deleted successfully');
});