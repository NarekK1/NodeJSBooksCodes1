import { EventEmitter } from 'events';
import { readFile } from 'fs';
//extends EventEmitter to create a FindRegex class
//create an EventEmitter instance
const myEventEmitter = new EventEmitter();
class FindRegex extends EventEmitter{
    constructor(regex){
        super();
        this.regex = regex;
        this.files = [];
    }
    //method to start searching regex in added files
    addFile(file){
        this.files.push(file);
        return this;
    }
    //method to find regex in the added files

    find(){
        //emit when the find process starts with the current files list
        this.emit('start', this.files);
        for(const file of this.files){
            //read the file asynchronously
            readFile(file, 'utf8', (err, content) => {
                //handle errors
                if(err){
                    return this.emit('error', err);
                }
                //emit 'fileread' event with the file name 
                this.emit('fileread', file);
                //search for the regex pattern in the file content
                const match = content.match(this.regex);
                //emit 'found' event for each match
                if(match){
                    match.forEach(elem => this.emit('found', file, elem));
                }
            })
         }
        return this;
    }
}
//run the FindRegex class with example files and regex pattern
const findRegexInstace = new FindRegex(/hello \w+/);
//add files and start findiing the regex pattern
findRegexInstace.addFile('fileA.txt').addFile('fileB.json')
//listen start events before kicking off the search
.on('start', files => console.log(`Starting search in files: ${files.join(', ')}`))
//listen fileread events and log file names
.find()
//listen found events and log matches
.on('found', (file, match) => console.log(`Matched "${match}" in file ${file}`))
//listen error events and log errors
.on('error', err => console.error(`Error emitted: ${err.message}`))
//myEventEmitter.emit('find', findRegexInstace, 'fileA.txt')
.on('fileread', file => console.log(`Finished reading file: ${file}`));