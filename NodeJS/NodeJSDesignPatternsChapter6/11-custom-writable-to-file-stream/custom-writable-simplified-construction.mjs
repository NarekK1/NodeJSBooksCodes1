import { Writable } from 'stream';
import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import mkdirp  from 'mkdirp-promise';

const tfs = new Writable({
    objectMode: true,
    write(chunk, encoding, cb){
        mkdirp(dirname(chunk.path))
        .then(() => fs.writeFile(chunk.path, chunk.content))
        .then(() => cb())
        .catch(cb);
    }
})
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