import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//construct the path to the file
const p = path.join(__dirname, 'file1.txt');

//use fs.stat to get the stats of the file asynchronously
fs.stat(p, { bigint: false }, function(err, stats){
    //check if there was an error
    if(err){
        //log the error message and return
        return console.error(err.message);
    }
    //log the time of the last change to the file
    console.log(stats.ctime);
});
