import iconv from "iconv-lite";
import fs from "fs";

//read file with file descriptor and close it after reading
function closeFd(fd){
    //check if fd is a number before closing it
    if(typeof(fd) === 'number'){
        //close the file descriptor
        fs.close(fd, function(err) {
            //handle error if any
            if(err){
                //log the error message
                console.error(err.message);
            }
            //log success message if file closed successfully
            else{
                //log the success message
                console.log('File closed successfully');
            }
        });
    }
}

//path to the file to be read
const p = './readingFromFileWithDescriptors/cp1251.txt';

//get the file stats to determine the size of the file
fs.stat(p, function(error, stats){
    //handle error if any
    if(error){
        //log the error message
        throw error;
    }
    
    //open the file for reading and get the file descriptor and handle error if any
    fs.open(p, 'r', function(err, fd){
        //handle error if any
        if(err){
            //log the error message
            throw err;
        }

        //log the success message with the file descriptor
        console.log(`File opened successfully. fd = ${fd}`);

        //create a buffer to hold the file data based on the file size
        const buf = Buffer.alloc(stats.size);

        //read the file data into the buffer using the file descriptor and handle error if any
        fs.read(fd, { buffer: buf, offset: 0, length: buf.length, position: null}, function(e, n, b){
            //handle error if any
            if(e){
                //close the file descriptor before throwing the error
                fs.closeSync(fd);
                //log the error message
                throw e;
            }
            //log the number of bytes read
            try{
                //log the number of bytes read
                console.log(n);
                //decode the buffer using the specified encoding and log the decoded string
                const str = iconv.decode(b, 'win1251');
                //log the decoded string
                console.log(str);
            }
            //close the file descriptor in the finally block to ensure it gets closed even if an error occurs
            finally{
                closeFd(fd);
            }
        });
    });
});

console.log('End of program');