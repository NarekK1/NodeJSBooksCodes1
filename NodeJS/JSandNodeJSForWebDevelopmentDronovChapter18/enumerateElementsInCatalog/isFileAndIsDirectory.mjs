import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async function(){
    try{
        const dir = await fs.promises.opendir(__dirname);


    for await(const d of dir){
         console.log(d.name);
         console.log('dir:', d.isDirectory());
         console.log('file:', d.isFile());
    }
}
catch(err){
    console.error(err);
}
})();