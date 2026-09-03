import fs from 'fs';

// Asynchronous access check F_OK - check if the file exists
fs.access('./gettingRightOfCatalog/file1.txt', fs.constants.F_OK, function(err){
    //handle the error
    if(err){
        //if the file does not exist, log the message
        console.log('File does not exist');
    }
    //if the file exists, log the message
    else{
        console.log('File exists');
    }
});