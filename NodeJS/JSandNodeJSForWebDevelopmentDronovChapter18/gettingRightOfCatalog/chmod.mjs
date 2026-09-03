import fs from 'fs';

//0o400 - read only for owner
try{
    //change the permission of file1.txt to read only for owner
    fs.chmodSync('./gettingRightOfCatalog/file1.txt', 0o400);
}
//handle error
catch(err){
    //log the error message
    console.error(err.message);
}