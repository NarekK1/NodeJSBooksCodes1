import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//delete the file asynchronously using promises
(async function(){
    //join the path of the file to be deleted
    const p = path.join(__dirname, 'folder1', 'file_4.txt');

    //delete the file and handle error
    try{
        //delete the file with promises
        await fs.promises.unlink(p);
        //log success message
        console.log('File deleted successfully');
    }
    //handle error
    catch(err){
        console.error(err.message);
    }
})();

console.log('End of program');