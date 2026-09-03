import fs from 'fs';

//this program demostrates how to write to a file using a file descriptor and promises 
(async function(){
    //variable to hold the file handle
    let fh;

    //open the file for writing and get the file handle
    try{
        //open the file for writing and get the file handle using promises
        fh = await fs.promises.open('./writeToFilesWithDescriptor/file2.txt', 'w');
        //log file opened successfully
        console.log('File opened successfully');

        //write to the file using the file handle and log the result
        let result = await fh.write('String1');
        //log the result of the write operation
        console.log(result);
        
        //create a buffer from a string and write it to the file using the file handle 
        const buf = Buffer.from('\nString2', 'utf8');

        //change the position of the file pointer to the end of the file before writing the buffer
        result = await fh.write(buf);
        //log the result of the write operatin
        console.log(result);
    }
    //catch any errors that occur during the file operations and log the error message
    catch(err){
        console.error(err.message);
    }
    //finally block to ensure that the file is closed after the operations are complete, regardless of whether an error occurred or not
    finally {
        //check if the file handle is defined before attempting to close it
        if(fh !== undefined){
            //close the file using the file handle and log a message indicating that the file was closed successfully
            await fh.close();
            console.log('File closed successfully');
        }
    }
})();

console.log('End of program');