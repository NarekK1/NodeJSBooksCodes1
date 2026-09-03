import path from 'path'
import fs from 'fs';
import { fileURLToPath } from 'url';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
//get the current directory name
const __dirname = path.dirname(__filename);

//read the file synchronously
try{
    //join the current directory name with the file name to get the full path of the file
    const p = path.join(__dirname, 'file1.txt');
    //read the file synchronously and specify the encoding to get the content as a string
    const str = fs.readFileSync(p, 'utf8');
    //logs the content of the file to the console
    console.log(str);
}
//catch any error that occurs during the file reading process and log the error message to the console
catch(e){
    console.error(e.message);
}

console.log('End of program')