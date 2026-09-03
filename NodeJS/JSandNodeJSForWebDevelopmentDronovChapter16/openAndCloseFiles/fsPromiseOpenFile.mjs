import iconv from 'iconv-lite';
import fs from 'fs';

//function to open file, read content and close file
(async function() {
    //variable to store file handle
    let fh;

    //open file, read content and close file
   try{
    //open file for reading and store file handle in variable fh
    fh = await fs.promises.open('./openAndCloseFiles/cp866.txt', 'r');
    console.log('File opened successfully');

    //read content of file using file handle and decode it from cp866 encoding
    const buf = await fs.promises.readFile(fh);
    //decode content with cp866 encoding
    const str = iconv.decode(buf, 'cp866');

    //log content of file to console
    console.log(str);
   }
   //handle any errors that occur during file operations
   catch(err){
    console.error(err.message);
   }
   //ensure that file is closed even if an error occurs and closes file
   finally{
    //check if file handle is defined before attempting to close file
    if(fh !== undefined){
        //close file using file handle
        await fh.close();
        //log message to console indicating that file has been closed
        console.log('File closed');
    }
   }
})();

//log message to console indicating that program has ended
console.log('End of program');