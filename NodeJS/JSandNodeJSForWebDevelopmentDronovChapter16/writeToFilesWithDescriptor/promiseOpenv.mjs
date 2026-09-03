import fs from 'fs';

//open file with promise and write to it using writev method of file handle
(async function(){
    //file handle variable
    let fh;

    //open file and write to it using writev method of file handle
    try{
        //open file with promise
        fh = await fs.promises.open('./writeToFilesWithDescriptor/file2.txt', 'w');
        //log success message
        console.log('File opened successfully');

        //create buffers to write to file
        const buf1 = Buffer.from('String1', 'utf8');
        const buf2 = Buffer.from('\nString2', 'utf8');

        //write to file using writev method of file handle
        const result = await fh.writev([buf1, buf2]);
        //log result
        console.log(result);
    }
    //catch error
    catch(err){
        //log error
        console.error(err);
    }
    //finally block to close file handle
    finally{
        //close file handle if it is defined
        if(fh !== undefined){
            //close file handle
            await fh.close();
            //log success message
            console.log('File closed successfully');
        }
    }
})();

console.log('Program Ended')