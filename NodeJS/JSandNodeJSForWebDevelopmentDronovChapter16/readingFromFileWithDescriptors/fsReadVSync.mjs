import fs from 'fs';

//variable to hold the file descriptor
let fd;

//open the file and read from it
try {
    //open the file for reading
    fd = fs.openSync('./readingFromFileWithDescriptors/file1.txt', 'r');
    //if the file is opened successfully, the file descriptor will be a non-negative integer
    console.log(`File opened successfully. fd = ${fd}`);

    //create two buffers to hold the data and read from the file
    const buf1 = Buffer.alloc(15);
    const buf2 = Buffer.alloc(15);
    //read from the file into the buffers using readvSync, which reads into multiple buffers in a single call
    const n = fs.readvSync(fd, [buf1, buf2]);
    
    //log the number of bytes read and the contents of the buffers to the console
    console.log(n);
    //convert the buffers to strings and print them to the console
    console.log(buf1);
    //log the second buffer to the console
    console.log(buf2);
}
//catch any errors that occur during the file operations
catch(err){
    //log the error message to the console
    console.error(err.message);
}
//close the file descriptor if it was opened successfully
finally{ 
    //check if the file descriptor is defined before attempting to close it
    if(fd !== undefined){
        //close the file descriptor
        fs.closeSync(fd);
        //log a message indicating that the file was closed successfully
        console.log('File closed successfully.');
    }
}

console.log('Program ended.');