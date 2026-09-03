import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rename the file synchronously
try{
    //define the old path and the new path for the file
    const oldPath = path.join(__dirname, 'file2.txt');
    const newPath = path.join(__dirname, 'file3.txt');

    //rename the file synchronously
    fs.renameSync(oldPath, newPath);
    //log a success message
    console.log('File renamed successfully');
}
//catch any errors that occur during the renaming process
catch(e){
    //log the error message to the console
    console.error(e.message);
}
//log a message indicating the end of the program
console.log('End of the program');