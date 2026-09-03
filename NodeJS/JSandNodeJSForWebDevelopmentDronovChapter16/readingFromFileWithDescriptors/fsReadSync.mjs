import fs from 'fs';

//variable to hold the file descriptor
let fd;

//open the file and read from it
try {
    //open the file for reading
    fd = fs.openSync('./readingFromFileWithDescriptors/file1.txt', 'r');
    //if the file is opened successfully, the file descriptor will be a non-negative integer
    console.log(`File opened successfully. fd = ${fd}`);

    //create a buffer to hold the data read from the file
    const buf = Buffer.alloc(12);
    //read from the file into the buffer
    const n = fs.readSync(fd, buf, 0, buf.length, null);
    //the readSync method returns the number of bytes read from the file
    console.log(n);

    //convert the buffer to a string and print it to the console
    const str = buf.toString('utf8', 0, n);
    //log the string read from the file
    console.log(str);
}
//catch any errors that occur during the file operations
catch(err){
    //log the error message to the console
    console.error(err.message);
}

//close the file descriptor if it was opened successfully
finally {
    //check if the file descriptor is defined before attempting to close it
    if(fd !== undefined){
        //close the file descriptor
        fs.closeSync(fd);
        //log a message indicating that the file was closed successfully
        console.log('File closed successfully.');
    }
}

console.log('Program ended.');