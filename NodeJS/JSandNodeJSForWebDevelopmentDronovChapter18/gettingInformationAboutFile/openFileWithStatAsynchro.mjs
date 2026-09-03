import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//getting the file name and directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//getting information about a file
(async function(){
    //variable to hold the file handle
    let fh;

    //open the file and get the stats
    try{
        //join the directory name and file name to get the full path to the file
        const p = path.join(__dirname, 'file1.txt');
        //open the file for reading
        fh = await fs.promises.open(p, 'r');

        //get the stats of the file
        const stats = await fh.stat({ bigint: false });
        //log the stats to the console
        console.log(stats);
    }
    //handle any errors that occur
    catch(err){
        //log the error to the console
        console.error(err);
    }
    //close the file handle if it was opened asynchronously
    finally{
        //check if the file handle is defined before trying to close it
        if(fh !== undefined){
            //close the file handle
            await fh.close();
        }
    }
})();
