import os from 'os';
import fs from 'fs';
import path from 'path';

//join the path to the temporary directory with a prefix of 'test-'
const p = path.join(os.tmpdir(), 'test-');

//create a temporary directory with a prefix of 'test-
try {
    //will create a temporary directory with a unique name that starts with 'test-'
    const name = fs.mkdtempSync(p, { encoding: 'utf8' });
    //log the name of the temporary directory that was created
    console.log(name);
} 
//catch any errors that occur during the creation of the temporary directory and log them to the console
catch(err){
    //log the error to the console
    console.error(err);
}