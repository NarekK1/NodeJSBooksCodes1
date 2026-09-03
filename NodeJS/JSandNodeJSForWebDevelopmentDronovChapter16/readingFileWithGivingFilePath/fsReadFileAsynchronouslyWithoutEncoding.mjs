import iconv from 'iconv-lite';
import fs from 'fs';

//read the file without encoding, it will be read as a buffer
fs.readFile('./readingFileWithGivingFilePath/cp866.txt', function(err, buf){
    //handle any error and print the buffer
    if(err){
        throw err;
    }
    //log the buffer to see the raw data
    console.log(buf);

    //decode the buffer using the correct encoding (cp866) and print the string
    const str = iconv.decode(buf, 'cp866');
    console.log(str);
})