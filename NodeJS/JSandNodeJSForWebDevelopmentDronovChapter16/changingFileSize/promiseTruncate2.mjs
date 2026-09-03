import fs from 'fs';

//open the file for reading and writing, then truncate it to 10 bytes.
(async function(){
    //file handle variable, so we can close it in the finally block if an error occurs.
    let fh;
    
    //path to the file we want to truncate.
    const p = './changingFileSize/file2.txt';

    //get the file stats, log the size, open the file, truncate it, close it, then get the stats again and log the new size.
    try{
        //get the file stats and log the size.
        let stats = await fs.promises.stat(p);
        //log the size of the file before truncating.
        console.log(stats.size);

        //open the file for reading and writing
        fh = await fs.promises.open(p, 'r+');
        //truncate the file to 10 bytes asynchronously.
        await fh.truncate(10);
        //close the file handle asynchronously.
        await fh.close();

        //set the file handle variable to undefined, so we don't try to close it again in the finally block.
        fh = undefined;
        //get the file stats again and log the new size.
        stats = await fs.promises.stat(p);

        //log the size of the file after truncating.
        console.log(stats.size);
    }
    //catch any errors that occur and log them.
    finally{
        //if the file handle variable is not undefined close the file handle asynchronously.
        if(fh !== undefined){
            //close the file handle asynchronously.
            await fh.close();
        }
    }
})();