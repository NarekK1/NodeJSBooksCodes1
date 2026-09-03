import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let fd;

//open the file and get the stats length of the file
try{
    //open the file and
    fd = fs.openSync(path.join(__dirname, 'file1.txt'), 'r');
    //get the stats of the file using the file descriptor
    const stats = fs.fstatSync(fd, { bigint: true });
    //log the size of the file
    console.log(stats.size);
}
//catch any error that occurs during the process
catch(err){
    //log the error
    console.error(err);
}
//finally block to close the file descriptor if it was opened
finally{
    //check if the file descriptor is defined and close it
    if(fd !== undefined){
        //close the file descriptor
        fs.closeSync(fd);
    }
}