import fs from 'fs';

//variable to store file descriptor
let fd;

//open file, read content and close file
try{
    //open file for reading and store file descriptor in variable fd
    fd = fs.openSync('./openAndCloseFiles/file1.txt', fs.constants.O_RDONLY);
    //log message to console indicating that file has been opened successfully and display file descriptor
    console.log(`File opened successfully. fd = ${fd} `);

    //read content of file using file descriptor and log content to console
    const str = fs.readFileSync(fd, 'utf8');
    //log content of file to console
    console.log(str);
}
//handle any errors that occur during file operations
catch(err){
    //log error message to console if an error occurs during file operations
    console.error(err.message);
}
//ensure that file is closed even if an error occurs and closes file
finally{
    //check if file descriptor is defined before attempting to close file
    if(fd !== undefined){
        //close file using file operator 
        fs.closeSync(fd);
        //log message to console indicating that file has been closed
        console.log('File closed');
    }
}