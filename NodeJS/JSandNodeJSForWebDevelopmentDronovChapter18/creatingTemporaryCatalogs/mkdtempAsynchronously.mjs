import fs from 'fs';
import os from 'os';
import path from 'path';

//create a temporary directory asynchronously with a unique name in the default temporary directory of the operating system.
fs.mkdtemp(os.tmpdir() + path.sep, function(err, name){
    //handle any errors that may occur during the creation of the temporary directory
    if(err){
        throw err;
    }

    //log the name of the created temporary directory to the console
    console.log(name);
});