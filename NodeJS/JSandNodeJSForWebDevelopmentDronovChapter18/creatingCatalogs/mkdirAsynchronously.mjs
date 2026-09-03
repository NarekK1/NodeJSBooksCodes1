import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name and file name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the path to create a new directory structure
const p = path.join(__dirname, 'folder4', 'folder5');

//create the directory structure using fs.mkdir with the recursive option set t true
fs.mkdir(p, { recursive: true }, function(err, d){
    //handle any errors that may occur during directory creation
    if(err){
        throw err;
    }
    //log a success message if the directory was created successfully
    console.log('Directory created successfully:', d);
});