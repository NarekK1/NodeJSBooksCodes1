import iconv from "iconv-lite";
import fs from 'fs';

//read the file using promises and log the content to the console
(async function() {
    try{
        //read the file as a buffer
        const buf = await fs.promises.readFile('./readingFileWithGivingFilePath/koi8r.txt');
        console.log(buf);

        //decode the buffer using the koi8-r encoding and log the content to the console
        const str = iconv.decode(buf, 'koi8-r');
        console.log(str);
    }
    //catch any errors that occur during the file reading and decoding process
    catch(err){
        console.error(err);
    }
})();