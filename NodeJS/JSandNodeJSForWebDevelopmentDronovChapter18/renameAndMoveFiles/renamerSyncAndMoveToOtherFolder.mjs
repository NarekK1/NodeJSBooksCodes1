import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//move the file synchronously
try{
    //define the old path and the new path for the file
    const oldPath = path.join(__dirname, 'file_2.txt');
    //define the new path for the file in the folder1 directory
    const newPath = path.join(__dirname, 'folder1', 'file_2.txt')

    //move the file synchronously
    fs.renameSync(oldPath, newPath);
    //log a success message
    console.log('File moved successfully');
}
//catch any errors that occur during the moving process
catch(e){
    //log the error message to the console
    console.error(e.message);
}