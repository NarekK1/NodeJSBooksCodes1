import iconv from 'iconv-lite';
import fs from 'node:fs';

//function to read file with file descriptor asynchronously
(async function() {
    //file handle
    let fh;

    //open file, read content, decode it and print to console
    try{
        //open file for reading
        fh = await fs.promises.open('./readingFromFileWithDescriptors/cp1251.txt', 'r');
        //print message to console
        console.log('File opened successfully');

        //red file content
        const buf = await fh.readFile({ encoding: null });
        //decode content and print to console
        const str = iconv.decode(buf, 'win1251');
        //log decoded content to console
        console.log(str);
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
            //log message to console
            console.log('File closed successfully');
        }
    }
})();

console.log('End of program');