import iconv from "iconv-lite";
import fs from 'fs';

// Encode the string to CP866 encoding
const data = iconv.encode('\nString2', 'cp866');

//append the encoded data to the file asynchronouslu
fs.appendFile('./writingToFileWithShowingPath/cp866.txt', data, function(err) {
    //check for errors
    if(err){
        throw err;
    }
    console.log('Data appended to file successfully.');
})