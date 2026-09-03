import fs from 'fs';

//directory of the file to be read and truncated
const p = './changingFileSize/file2.txt';

//variable to hold the file descriptor, initialized to undefined
let fd;

//try block to read the file size, truncate it, and read the size again
try{
    //log the initial size of the file
    console.log(fs.statSync(p).size);
    //open the file in read-write mode and get the file descriptor
    fd = fs.openSync(p, 'r+');
    //truncate the file to 10 bytes using the file descriptor
    fs.ftruncateSync(fd, 10);
    //close the file descriptor and set it to undefined
    fs.closeSync(fd);
    //set the file descriptor to undefined after closing
    fd = undefined;
    //log the size of the file after truncation
    console.log(fs.statSync(p).size);
}
//close the file descriptor in the finally block to ensure it happens regardless of any errors
finally{
    //check if the file descriptor is not undefined before attempting to close it
    if(fd !== undefined){
        //close the file descriptor to free up system resources
        fs.closeSync(fd);
    }
}