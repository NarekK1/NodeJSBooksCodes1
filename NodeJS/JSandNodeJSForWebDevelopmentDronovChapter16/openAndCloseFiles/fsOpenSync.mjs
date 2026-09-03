import fs from 'fs';

let fd;

//open file, read content and close file using synchronous methods
try{
    //open file for reading
    fd = fs.openSync('./openAndCloseFiles/file1.txt', 'r');
    //if file is opened successfully, print message
    console.log('File opened successfully');

    //read content of file and print to console
    const str = fs.readFileSync(fd, 'utf8');
    //print content of file to console
    console.log(str);
}
//catch any error that occurs during file operations and print error message to console
catch(err){
    console.error(err.message);
}
//finally block to ensure that file is closed even if an error occurs during file operations
finally{
    //check if file descriptor is defined before attempting to close file
    if(fd !== undefined){
        //close fileand print message to console
        fs.closeSync(fd);
        console.log('File closed successfully');
    }
}

console.log('End of program')