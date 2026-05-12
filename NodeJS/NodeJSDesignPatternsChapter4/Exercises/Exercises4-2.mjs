//import fs from 'fs' asynchronous version
import fs from 'fs/promises';
//function list nested files and directories
async function listNestedFiles(dir, cb){
    //read directory contents
    const filePath = await fs.readdir(dir, {withFileTypes: true}, err => cb(err));
    //itrate through directory entries
    return filePath.forEach(async (files) => console.log(files));
}
//test the function with a sample directory path
listNestedFiles('C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\NodeJSDesignPatternsChapter4')