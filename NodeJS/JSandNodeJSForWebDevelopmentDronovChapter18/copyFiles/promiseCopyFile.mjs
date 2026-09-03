import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//function to copy the file using promises
(async function(){
    //join the path of source and destination
    const srcPath = path.join(__dirname, 'file1.txt');
    //join the path of source and destination to copy the file in folder1 with new name file_6.txt
    const destPath = path.join(__dirname, 'folder1', 'file_6.txt');

    //copy the file using promises
    try{
        //if the file already exists, it will throw an error because of the flag COPYFILE_EXCL
        await fs.promises.copyFile(srcPath, destPath, fs.constants.COPYFILE_EXCL);
        //log the success message if the file is copied successfully
        console.log('File copied successfully');
    }
    //catch the error if the file already exists or any other error occurs
    catch(err){
        //log the error message and return from the function
        console.error(err.message);
    } 
})();

console.log('End of program');