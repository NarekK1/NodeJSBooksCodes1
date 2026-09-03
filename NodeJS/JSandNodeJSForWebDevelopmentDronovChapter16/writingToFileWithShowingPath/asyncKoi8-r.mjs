import iconv from 'iconv-lite';
import fs from 'fs';

//function to write to a file using fs.promises.writeFile and log a message when the file is written successfully or if there is an error
(async function() {
    //encode the string to koi8-r encoding and write it to the file
    try{
        //encode the string to koi8-r encoding
        const data = iconv.encode('String1', 'koi8-r');
        //write to the file using fs.promises.writeFile and log a message when the file is written successfully or if there is an error
        await fs.promises.writeFile('./writingToFileWithShowingPath/koi8r.txt', data);
        //log the message to the console
        console.log('Data written successfully');
    }
    //log the error message to the console if there is an error
    catch(err){
        console.error(err.message);
    }
})();