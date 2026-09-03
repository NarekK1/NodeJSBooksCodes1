import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

//fileURLToPath() method returns the file path of the current module
const __filename = fileURLToPath(import.meta.url);
//dirname() method returns the directory name of a path 
const __dirname = path.dirname(__filename);

try{
    //join() method joins all given path segments together
    const p = path.join(__dirname, 'file1.txt');
    //writeFileSync() method writes data to a file synchronously
    fs.writeFileSync(p, 'String1', 'utf8');
    //logs the message if the file is successfully written
    console.log('Successfully written to file');
}
//catch() method handles the error if any error occurs during writing to the file
catch(e){
    console.error(e.message);
}

//logs the message at the end of the program
console.log("End of the program");