import { EventEmitter } from 'events';
import { readFile } from 'fs';
function findRegex(files, regex){
    //create an event emitter instance
    const emitter = new EventEmitter();
    //iterate over each file
    for(const file of files){
        //read the file asynchronously
        readFile(file, 'utf-8', function(err, data){
            //handle errors
            if(err){
                return emitter.emit('error', err);
            }
            //emit 'fileread' event with the file name and content
            emitter.emit('fileread', file);
            //search for the regex pottern in the file content
            const match = content.match(regex);
            //emit 'found' event for each match
            if(match){
                match.forEach(elem => emitter.emit('found', file, elem));
            }
        })
    }
    return emitter;
}
//run the findRegex function with example flies and regex pattern
findRegex(['fileA.txt', 'fileB.json'], /hello \w+/g)
.on('fileread', file =>  console.log(`${file} was read`))
.on('found', (file, match) => console.log(`Matched "${match}" in file ${file}`))
.on('error', err => console.error(`Error emitted: ${err.message}`));