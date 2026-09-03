import fs from 'fs';

//file directory
const p = './changingFileSize/file2.txt';

//truncateSync() method is used to change the size of a file
try{
    //check the file size before truncating
    console.log(fs.statSync(p).size);
    //truncate the file to 0 bytes
    fs.truncateSync(p);
    //check the file size after truncating
    console.log(fs.statSync(p).size);
    //truncate the file to 5 bytes
    fs.truncateSync(p, 5);
    //check the file size after truncating
    console.log(fs.statSync(p).size);
}
//handle error
catch(e){
    //log the error message
    console.log(e.message);
}