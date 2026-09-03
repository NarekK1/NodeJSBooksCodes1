import fs from 'fs';
import iconv from 'iconv-lite';

//function to read file with descriptors using promises
(async function(){
    //file handle variable
    let fh;

    //try to open file, read it and close it
    try{
        //open file for reading
        fh = await fs.promises.open('./readingFromFileWithDescriptors/cp1251.txt', 'r');
        //log success
        console.log('File opened successfully');

        //get file stats to determine buffer size
        const stats = await fh.stat();
        //allocate buffer based on file size
        const buf = Buffer.alloc(stats.size);
        //read file contents into buffer
        const obj = await fh.read(buf, 0, buf.length, null);
        //log read object
        console.log(obj);

        //decode buffer using win1251 encoding and log the string
        const str = iconv.decode(obj.buffer, 'win1251');
        //log the decoded string
        console.log(str);
    }
    //handle any errors that occur during file operations
    catch(err){
        //log error message
        console.error(err.message);
    }
    //ensure that the file is closed even if an error occurs
    finally{
        //check if file handle is defined before attempting to close it
        if(fh !== undefined){
            //close the file handle
            await fh.close();
            //log success message for closing the file
            console.log('File closed successfully');
        }
    }
})();

console.log('Program ended');