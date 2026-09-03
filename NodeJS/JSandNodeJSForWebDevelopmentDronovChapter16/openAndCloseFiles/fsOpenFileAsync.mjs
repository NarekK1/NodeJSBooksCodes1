import iconv from 'iconv-lite';
import fs from 'fs';

//open file, read content and close file using asynchronous methods
function closeFd(fd){
    //check if file descriptor is a number before attempting to close file
    if(typeof fd === 'number'){
        //close file, handle errors and log message to console 
        fs.close(fd, function(err){
            //if an error occurs during file closing, log error message to console
            if(err){
                //log error message to console
                console.error(err.message);
            }
            //if file is closed successfully, log message to console
            else{
                console.log('File closed successfully');
            }
        });
    }
}

//open file for reading and read content of file using asynchronous methods
fs.open('./openAndCloseFiles/cp1251.txt', 'r', function(err, fd){
    //if an error occurs during file opening, log error message to console and return from function
    if(err){
        console.error(err.message);
        return;
    }
    //if file is opened successfully, log message to console and read content of file
    console.log(`File opened successfully with fd: ${fd}`);
    //read content of file, handle errors and log content to console
    fs.readFile(fd, function(err, buf){
        //if an error occurs during file reading, log error message to console, close file and return from function
        if(err){
            //log error message to console
            console.error(err.message);
            //close file and return from function
            closeFd(fd);
            return;
        }
        //if file is read successfully, decode content using win1251 encoding, log content to console and close file
        try{
            //decode content of file using win1251 encoding and log content to console
            const str = iconv.decode(buf, 'win1251');
            console.log(str);
        }
        //close file
        finally{
            closeFd(fd);
        }
    });
});

//log message to console indicating end of program
console.log('End of program');