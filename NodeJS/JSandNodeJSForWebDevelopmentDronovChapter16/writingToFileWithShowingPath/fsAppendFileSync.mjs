import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

//fileURLToPath() method converts a file URL to a path
const __filename = fileURLToPath(import.meta.url);
//path.dirname() method returns the directory name of a path
const __dirname = path.dirname(__filename);

try {
    //path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
    const p = path.join(__dirname, 'file3.txt');
    //fs.appendFileSync() method is used to synchronously append data to a file, creating the file if it does not exist
    fs.appendFileSync(p, 'String1', 'utf8');
    fs.appendFileSync('./writingToFileWithShowingPath/file3.txt', '\nString2', 'utf8');
    //logging the success message after writing to the file
    console.log('File written successfully');
}
//catching any errors that occur during the file writing process and logging the error message
catch(e){
    console.error(e.message);
}

console.log('End of program');