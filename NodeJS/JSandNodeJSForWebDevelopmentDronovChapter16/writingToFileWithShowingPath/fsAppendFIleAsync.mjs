import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = path.dirname(__filename);

//create a file path by joining the directory name and the file name
const p = path.join(__dirname, 'file6.txt');

//append data to the file asynchronously
fs.appendFile(p, 'String1', 'utf8', function(err) {
    //check for errors
    if(err){
        //if there is an error, log the error message
        console.error(err.message);
    }
    //if there is no error, log a success message
    else{
        console.log('Data appended to file successfully.');
    }
});

console.log('End of program')