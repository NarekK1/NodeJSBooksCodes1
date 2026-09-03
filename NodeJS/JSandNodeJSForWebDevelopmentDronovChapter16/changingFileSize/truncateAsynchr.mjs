import fs from 'fs';

//variable p is the path to the file we want to truncate
const p = './changingFileSize/file2.txt';

//first we check the size of the file before truncating it
console.log(fs.statSync(p).size);

//then we truncate the file to 5 bytes and check the size again
fs.truncate(p, 5, function(err){
    //if there is an error, we throw it
    if(err){
        //if there is an error, we throw it
        throw err;
    }
    //after truncating the file, we check the size again
    console.log(fs.statSync(p).size);
})