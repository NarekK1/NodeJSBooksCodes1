import fs from 'fs';

//read file with file descriptor and close it after reading
function closeFd(fd){
    //check if fd is a number before closing it
    if(typeof(fd) === 'number'){
        //close the file descriptor 
        fs.close(fd, function(err){
            //handle error if any
            if(err){
                //log the error message
                console.error(err.message);
            }
            //log success message if file closed successfully
            else{
                console.log('File closed successfully');
            }
        });
    }
}

//open the file for reading and get the file descriptor and handle error if any
fs.open('./readingFromFileWithDescriptors/file1.txt', 'r', function(err, fd){
    //handle error if any
    if(err){
        //throw the error
        throw err;
    }

    //log the success message with the file descriptor
    console.log(`File opened successfully. fd = ${fd}`);

    //create two buffers to hold the file data
    const buf1 = Buffer.alloc(5);
    //create a second buffer to hold the next 5 bytes of data
    const buf2 = Buffer.alloc(5);

    //read the file data into the buffers using the file descriptor and handle error if any
    fs.readv(fd, [buf1, buf2], function(e, n, bs){
        //handle error if any
        if(e){
            //close the file descriptor before throwing the error
            fs.closeSync(fd);
            //throw an error
            throw e;
        }
        //log the number of bytes read and the buffers
        try{
            //log the number of bytes read
            console.log(n);
            //log the buffers 
            console.log(bs);
        }
        //close the file descriptor in the finally block to ensure it is closed even if an error occurs
        finally{
            //close the file descriptor
            closeFd(fd);
        }
    });
});

console.log('End of program');