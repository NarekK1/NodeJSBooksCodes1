import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the path to create a new folder
const p = path.join(__dirname, 'folder2', 'folder3');

//create a folder synchronously
try{
    //recursive: true - allows to create nested folders
    const d = fs.mkdirSync(p, { recursive: true });
    //if the folder already exists, it will not throw an error due to recursive: true
    console.log('Catalog created successfully:', d);
}
//catch any errors that occur during folder creation
catch(err){
    //log the error to the console
    console.error(err);
}