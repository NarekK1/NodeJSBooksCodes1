import fs from 'fs';

//read the file size before truncating it, then truncate the file to 5 bytes and read the file size again
(async function(){
    try{
        //variable p is the path to the file we want to truncate
        const p = './changingFileSize/file2.txt';
        
        //stats is an object that contains information about the file, including its size
        let stats = await fs.promises.stat(p);
        //after reading the file size, we log it to the console
        console.log(stats.size);

        //then we truncate the file to 5 bytes and check the size again
        await fs.promises.truncate(p, 5);
        //after truncating the file, we read the file size again and log it to the console
        stats = await fs.promises.stat(p);
        //after reading the file size, we log it to the console
        console.log(stats.size);

    }
    //if there is an error, we catch it and log the error message to the console
    catch(err){
        console.error(err.message);
    }
})();