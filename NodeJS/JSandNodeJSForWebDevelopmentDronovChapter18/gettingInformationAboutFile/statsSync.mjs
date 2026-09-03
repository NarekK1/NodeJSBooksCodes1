import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get file name and directory name
const __filename = fileURLToPath(import.meta.url);
const  __dirname = path.dirname(__filename);

//get the path of the file
const p = path.join(__dirname, 'file1.txt');

//get the stats of the file
try{
    //get the stats of the file
    const stats = fs.statSync(p);
    //log the stats size of the file
    console.log(stats.size);
}
//catch the error if the file does not exist
catch(err){
    //log the error message
    console.error(err.message);
}