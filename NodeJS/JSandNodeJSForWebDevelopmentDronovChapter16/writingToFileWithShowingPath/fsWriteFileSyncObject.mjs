import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

//fileURLToPath() method returns the file path of the current module
const __filename = fileURLToPath(import.meta.url);
//dirname() method returns the directory name of a path
const __dirname = path.dirname(__filename);

//object to be written to the file
const obj = {
    a: 10,
    b: 20,
    toString() {
        return 'a: ' + this.a + ', b: ' + this.b;
    }
};

//stringify() method converts a JavaScript object into a JSON string
const objString = JSON.stringify(obj);

try{
    //join method joins all given path segments together
    const p = path.join(__dirname, 'file2.txt');
    //writeFileSync() method writes data to a file synchronously
    fs.writeFileSync(p, objString);
}
//catch() method handles the error if any error occurs during writing to the file
catch(err){
    console.log(err.message);
}