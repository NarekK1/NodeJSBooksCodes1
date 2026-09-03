import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

//fileURLToPath() is used to convert the URL of the current module to a file path
const __filename = fileURLToPath(import.meta.url);
//path.dirname() is used to get the directory name of the current module's file path
const __dirname = path.dirname(__filename);

const obj = {
    a: 10,
    b: 20,
    toString() {
        return 'a: ' + this.a + ', b: ' + this.b;
    }
};

//JSON.stringify() is used to convert a JavaScript object into a JSON string.
const str = JSON.stringify(obj);

//path.join() is used to join the directory name with the file name 'file5.txt' to create the full path to the file.
const p = path.join(__dirname, 'file5.txt');

//fs.writeFile() is used to write data to a file. In this case, it writes the JSON string representation of the object to 'file5.txt'.
fs.writeFile(p, str, 'utf8', function(err) {
    //check if there was an error during the file writing process
    if(err){
        console.error(err.message);
    }
});