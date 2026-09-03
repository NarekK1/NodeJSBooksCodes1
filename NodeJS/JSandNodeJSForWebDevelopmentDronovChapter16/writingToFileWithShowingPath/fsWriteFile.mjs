import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

//fileURLToPath() is used to convert the URL of the current module to a file path
const __filename = fileURLToPath(import.meta.url);
//path.dirname() is used to get the directory name of the current module's file path
const __dirname = path.dirname(__filename);

//path.join() is used to join the directory name with the file name 'file4.txt' to create the full path to the file.
const p = path.join(__dirname, 'file4.txt');

//fs.writeFile() is used to write data to a file.
fs.writeFile(p, 'String1', 'utf-8', function(err) {
    //check if there was an error during the file writing process
    if(err){
        console.error(err.message);
    }
    else{
        console.log('Data written successfully');
    }

});

console.log('end of program')
