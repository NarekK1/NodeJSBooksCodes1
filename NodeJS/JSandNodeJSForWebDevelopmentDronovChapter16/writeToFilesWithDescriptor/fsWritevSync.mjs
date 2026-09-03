import fs from 'fs';

//open file for writting, if file does not exist create it, if file exist truncate it
let fd;

//open file for writting, if file does not exist create it, if file exist truncate it
try {
    //open file for writting, if file does not exist create it, if file exist truncate it
    fd = fs.openSync('./writeToFilesWithDescriptor/file2.txt', 'w');
    //if file opened successfully, write string to file
    console.log(`File opened successfully. fd = ${fd}`);

    //buffers to write to file
    const buf1 = Buffer.from('String1', 'utf8');
    const buf2 = Buffer.from('\nString2', 'utf8');

    //write string to file using writevSync method
    console.log(fs.writevSync(fd, [buf1, buf2]));
}
//catch error if file cannot be opened for writting
catch(err){
    //log error message to console
    console.error(err.message);
}
//close file if it was opened successfully
finally {
    //if file was opened successfully, close it
    if(fd !== undefined){
        //close file
        fs.closeSync(fd);
        console.log('File closed')
    }
}

console.log('Program ended');