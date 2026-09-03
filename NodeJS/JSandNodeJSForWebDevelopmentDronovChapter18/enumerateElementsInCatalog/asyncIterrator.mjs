import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current directory of the file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//path to the folder we want to read
const p = path.join(__dirname, 'folder1');

//using an async iterator to read the contents of the folder
(async function(){
    //open the directory and get the async iterator
    try{
        //open the directory
        const dir = await fs.promises.opendir(p);
        //get the async iterator
        const it = dir[Symbol.asyncIterator]();

        //read the first element in the directory
        console.log(await it.next());

        //read the rest of the elements in the directory
        for await(const d of dir){
            //log the name of the element
            console.log(d.name);
        }
    }
    //catch any errors that occur
    catch(err){
        //log the error
        console.error(err);
    }
})();
