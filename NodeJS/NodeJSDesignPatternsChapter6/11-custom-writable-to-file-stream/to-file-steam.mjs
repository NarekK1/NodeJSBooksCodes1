import { Writable } from 'stream';
import { promises as fs } from 'fs';
import { dirname } from 'path';
import  { mkdirp }  from 'mkdirp'

//a writable stream that writes data chunks to files
export class ToFileStream extends Writable {
    //enable object mode to handle objects
    constructor(options){
        //call the parent constuctor with objectMode set to true
        super({...options, objectMode: true});
    }
    //the method writes each chunk (object with path and content) to a file
    _write(chunk, encoding, cb){
        //create directories if they don't exist and write the file
        mkdirp(dirname(chunk.path))
        //create the file with the specified content
        .then(() => fs.writeFile(chunk.path, chunk.content))
        //call the callback to signal completion
        .then(() => cb())
        //handle errors
        .catch(cb);
    }
}