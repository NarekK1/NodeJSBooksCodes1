import { join } from 'path';
import { ToFileStream } from './to-file-steam.mjs';
//create an instace of ToFileStream
const tfs = new ToFileStream();

//write multiple files to the 'files' directory
tfs.write({
    path: join('files', 'file1.txt'),
    content: 'Hello'
})
tfs.write({
    path: join('files', 'file2.txt'),
    content: 'Node.js'
})
tfs.write({
    path: join('files', 'file3.txt'),
    content: 'streams'
})
//end the writable stream and log when all files have been created
tfs.end(() => console.log('All files created'));