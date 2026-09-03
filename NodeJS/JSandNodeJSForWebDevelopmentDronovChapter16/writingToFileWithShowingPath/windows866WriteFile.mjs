import iconv from "iconv-lite";
import fs from 'fs';

//iconv.encode() is used to encode the string 'String1' into a Buffer using the 'cp866' encoding.
const data = iconv.encode('String1', 'cp866');

//fs.writeFile() is used to write the encoded data to a file named 'cp866.txt' in the 'writingToFileWithShowingPath' directory.
fs.writeFile('./writingToFileWithShowingPath/cp866.txt', data, function(err){
    //check if there was an error during the file writing process
    if(err){
        throw err;
    }
    console.log('Data written successfully');
})