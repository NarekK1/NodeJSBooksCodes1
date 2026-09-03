import fs from 'fs';

//open file with promise and write to it using writeFile method of file handle
(async function(){
    //file handle variable
    let fh;

    //open file and write to it using writeFile method of file handle
    try{
        //open file with proimse
        fh = await fs.promises.open('./writeToFilesWithDescriptor/file2.txt', 'w');
        //log success message
        console.log('File opened successfully')

        //write to file using writeFile method of file handle
        await fh.writeFile('Test', 'utf8');
        //log success message
        console.log('File written successfully')
    }
    //catch error
    catch(err){
        //log erro
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