import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//open file and get file descriptor
const fd = fs.openSync(path.join(__dirname, 'file1.txt'), 'r');

//get file stats asynchronously
fs.fstat(fd, { bigint: false }, function(err, stats){
    //handle error
    if(err){
        //log error message and close file descriptor
        console.error(err.message);
        //close file descriptor and return
        return fs.closeSync(fd);
    }
    //log file stats
    console.log(stats.ctimeMs);
    //close file descriptor
    fs.closeSync(fd);
})