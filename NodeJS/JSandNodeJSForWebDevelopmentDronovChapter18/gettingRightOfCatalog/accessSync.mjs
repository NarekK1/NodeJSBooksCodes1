import fs from 'fs';

//checking if file is writable
try{
    //checking if file is writable
    fs.accessSync('./gettingRightOfCatalog/file1.txt', fs.constants.W_OK);
    //log if the file is writable
    console.log('File is writable');
}
//hanlde errors
catch(err){
    //log error message
    console.error(err.message);
}