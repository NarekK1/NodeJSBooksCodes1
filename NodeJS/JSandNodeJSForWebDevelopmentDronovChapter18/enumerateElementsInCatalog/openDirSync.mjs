import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current directory of the file and the filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//open the directory and read its contents synchronously
try{
    //open the directory and read its contents synchronously
    const dir = fs.opendirSync(path.join(__dirname, 'folder1'));
    //print the path of the directory and the contents of the directory
    console.log(dir.path);
    //read the contents of the directory and print them to the console
    console.log(dir.readSync());
    //read the contents of the directory and print them to the console
    console.log(dir.readSync());
    //read the contents of the directory and print them to the console
    console.log(dir.readSync());
    //read the contents of the directory and print them to the console
    console.log(dir.readSync());
}
//catch any errors that occur and print them to the console
catch(err){
    //log the error to the console
    console.error(err);
}