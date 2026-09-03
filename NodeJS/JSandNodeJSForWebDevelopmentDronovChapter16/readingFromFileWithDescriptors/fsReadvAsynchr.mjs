import fs from 'fs';

//function to read file with file descriptor asynchronously
(async function() {
    //file handle
    let fh;

    //open file, read content and log to console
    try{
        //open file for reading with file descriptor and promises
        fh = await fs.promises.open('./readingFromFileWithDescriptors/file1.txt', 'r');
        //log success message to console
        console.log('File opened successfully');

        //allocate two buffers to read data into with 15 bytes each
        const buf1 = Buffer.alloc(15);
        const buf2 = Buffer.alloc(15);

        //read data from file into buffers with readv method and log result to console
        const obj = await fh.readv([buf1, buf2]);
        console.log(obj);
    }
    //handle errors
    catch(err){
        //log error message to console
        console.error(err.message);
    }
    //close file
    finally{
        //check if file handle is defined
        if(fh !== undefined){
            //close file
            await fh.close();
            //log  success message to console
            console.log('File closed successfully');
        }
    }
})();

console.log('End of program');