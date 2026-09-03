import fs from 'fs';

//check if file is readable and writable using promises
(async function(){
    //check if file is readable and writable
    try{
        //check if file is readable and writable R_OK: check if file is readable, W_OK: check if file is writable
        await fs.promises.access('./gettingRightOfCatalog/file1.txt', 
            fs.constants.R_OK | fs.constants.W_OK);
        //if no error is thrown, then file is readable and writable
        console.log('File is readable and writable');
    }
    //if error is thrown, then file is not accessible
    catch(err){
        //log error message
        console.error('File is not accessible');
    }
})();