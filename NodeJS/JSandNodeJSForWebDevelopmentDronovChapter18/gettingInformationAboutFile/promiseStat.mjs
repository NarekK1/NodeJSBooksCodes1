import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//get file stats using promises and async/await
(async function(){
    //open file and get file descriptor and centruies time in milliseconds
    try{
        //join directory name and file name to get file path
        const p = path.join(__dirname, 'file1.txt');
        //get file stats using promises and async/await including bigint option
        const stats = await fs.promises.stat(p, { bigint: true });
        //log file stats including centuries time in milliseconds
        console.log(stats.ctimeMs);
    }
    //handle error
    catch(err){
        //log error message
        console.error(err.message);
    }
})();