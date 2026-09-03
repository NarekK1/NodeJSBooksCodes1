import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the path to the file to be deleted
const p = path.join(__dirname, 'folder1', 'file_6.txt');

//delete the file using unlinkSync method
try {
    //delete the file
    fs.unlinkSync(p);
    //log success message
    console.log('File deleted successfully');
}
//catch any errors that occur during deletion
catch(err){
    //log the error message
    console.error(err.message);
}

console.log('End of program');