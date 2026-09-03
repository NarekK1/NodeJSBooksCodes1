import iconv from 'iconv-lite'
import fs from 'fs';

//appendFile() method is used to append data to a file.
(async function() {
    //handling the promise returned by appendFile() method
    try{
        //encoding the string to koi8-r encoding
        const data = iconv.encode('\nString2', 'koi8-r');
        //appending the data to the file
        await fs.promises.appendFile('./writingToFileWithShowingPath/koi8r.txt', data);
        console.log('Data appended to file successfully');
    }
    //catching the error if any
    catch(err){
        console.error(err.message);
    }
})();