import fs from 'fs';

let fd;

//open file for writting, if file does not exist create it, if file exist truncate it
try {
    //flags for open file for writting, if file does not exist create it, if file exist truncate it
    const flags = fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_TRUNC;

    //open file for writting, if file does not exist create it, if file exist truncate it
    fd = fs.openSync('./fileOpeningMode/file2.txt', flags);
    //if file opened successfully, write string to file
    console.log(`File opened successfully. fd = ${fd}`);

    //write string to file
    fs.writeFileSync(fd, 'String1', 'utf8');
}
//catch error if file cannot be opened for writting
catch(err) {
    //log error message to console
    console.error(err.message);
}
//close file if it was opened successfully
finally {
    //if file was opened successfully, close it
    if(fd !== undefined) {
        //close file
        fs.closeSync(fd);
        console.log('File closed');
    }
}