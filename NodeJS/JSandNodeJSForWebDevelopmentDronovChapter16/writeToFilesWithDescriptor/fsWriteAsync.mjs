import fs from 'fs';

//function to close file descriptor
function closeFd(fd){
    //check if fd is a number before trying to close it
    if(typeof(fd) === 'number'){
        //close file descriptor
        fs.close(fd, function(err){
            //log error message if there is an error closing the file descriptor, otherwise log that the file was closed
            if(err){
                //log error message to console
                console.error(err.message);
            }
            //log that the file was closed
            else{
                console.log('File closed');
            }
        });
    }
}

//open file for writting, if file does not exist create it, if file exist truncate it
fs.open('./writeToFilesWithDescriptor/file2.txt', 'w', function(err, fd){
    //log error message if there is an error openning the file, otherwise log that the file was opened successfully and write to the file
    if(err){
      return console.error(err.message);
    }
    
    //log that the file was opened successfully
    console.log(`File opened successfully. fd = ${fd}`);

    //write string to file using write method
    fs.write(fd, 'String1', function(err, w, s){
        //log error message if there is an error writing to the file, otherwise log the number of bytes written and the string that was written
        if(err){
            //log error message to console
            console.error(err.message);
            //close file descriptor
            return closeFd(fd);

        }

        //log the number of bytes written and the string that was written
        console.log(`w = ${w}`);
        //log the string that was written
        console.log('s =', s);

        //write string to file using write method
        const buf = Buffer.from('\nString2', 'utf8');

        //write string to file using write method
        fs.write(fd, buf, 0, buf.length, function(e, bw, b){
            //log error message if there is an error writting to the file, otherwise log the number of bytes written and the buffer that was written
            if(e){
                //log error message to console
                console.error(e.message);
                //close file descriptor
                return closeFd(fd);
            }

            //log the number of bytes written and the buffer that was written
            console.log(`bw = ${bw}`);
            //log the buffer that was written
            console.log('b =', b);
            //close file descriptor
            closeFd(fd);
        });
    });
});

console.log('Program ended');