import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//delete file using promises
(async function(){
    //path of the file to be deleted
    const p = path.join(__dirname, 'folder1', 'file_4.txt');

    //delete the file
    try{
        //delete the file using promises
        await fs.promises.rm(p);
        //log success message
        console.log('File deleted successfully');
    }
    //catch any error
    catch(err){
        //log the error message
        console.error(err.message);
    }
})();

console.log('End of the program');