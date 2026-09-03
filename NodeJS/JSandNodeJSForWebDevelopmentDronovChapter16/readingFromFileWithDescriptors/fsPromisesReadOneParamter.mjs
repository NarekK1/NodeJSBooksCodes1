import iconv from 'iconv-lite';
import fs from 'fs';

//function to read from file with descriptors using fs.promises.read() method with one parameter
(async function(){
    //variable to hold file handle
    let fh;

    //try to open file, read from it and close it
    try{
        //open file for reading with descriptor r which stands for read
        fh = await fs.promises.open('./readingFromFileWithDescriptors/cp1251.txt', 'r');
        //log success message
        console.log('File opened successfully');

        //get file stats to determine the size of the buffer needed to read the file
        const stats = await fh.stat();
        //allocate buffer with the size of the file
        const buf = Buffer.alloc(stats.size);

        //create an object with the parameters needed for the read method
        const params = {
            //the buffer to read the data into
            buffer: buf,
            //the offset in the buffer to start writing at
            offset: 0,
            //the number of bytes to read
            length: buf.length,
            //the position in the file to start reading from, null means read from the current position
            position: null
        };

        //read from the file using the read method with the parameters object
        const obj = await fh.read(params);
        //log the object returned by the read method
        console.log(obj);

        //decode the buffer using iconv to conert it from win1251 encoding to a string and log the result
        const str = iconv.decode(obj.buffer, 'win1251');
        //log the decoded string
        console.log(str);
    }
    //catch any errors that occur during the file operations and log them
    catch(err){
        //log the error
        console.error(err);
    }
    //finally block to ensure that the file is closed even if an error occurs
    finally{
        //check if the file handle is defined before trying to close it
        if(fh !== undefined){
            //close the file handle and log a success message
            await fh.close();
            //log success message
            console.log('File closed successfully');
        }
    }
})();

console.log("End of program");