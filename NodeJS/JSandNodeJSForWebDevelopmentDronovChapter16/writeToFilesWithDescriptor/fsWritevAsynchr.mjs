import fs from 'fs';

//function to close file descriptor and handle error if any
function closeFd(fd){
    //check if fd is a number before closing file descriptor
    if(typeof(fd) === 'number'){
        //close file descriptor and handle error if any
        fs.close(fd, function(err) {
            //handle error if any
            if(err){
                //log error message if error occurs while closing file descriptor
                console.error(err.message);
            }
            //log success message if file descriptor is closed successfully
            else{
                console.log('File closed successfully');
            }
        });
    }
}

//open file for writing and get file descriptor to write to file and handle error if any
fs.open('./writeToFilesWithDescriptor/file2.txt', 'w', function(err, fd){
    //handle error if any
    if(err){
        //log error  message if error occurs while opening file
        return console.error(err.message);
    }
    
    //buffers to write to file
    const buf1 = Buffer.from('String1', 'utf8');
    const buf2 = Buffer.from('\nString2', 'utf8');

    //write to file using file descriptor and close file after writing and handle error if any asynchronously
    fs.writev(fd, [buf1, buf2], function(err, bw, bs){
        //handle error if any
        if(err){
            //log error message if error occurs while writing to file
            console.error(err.message);
            //close file descriptor if error occurs while writing to file
            return closeFd(fd);
        }

        //log number of bytes written and buffers written to file
        console.log(`bw = ${bw}`);
        //log buffers written to file
        console.log('bs =', bs);
    });
});

console.log('Program Ended');