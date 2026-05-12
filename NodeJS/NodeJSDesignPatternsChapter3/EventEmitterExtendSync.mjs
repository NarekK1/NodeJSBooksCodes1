import { match } from 'assert';
import { EventEmitter} from 'events';
import { readFileSync } from 'fs';

class FindRegexSync extends EventEmitter {
    //extends EventEmitter to create a FindRegexSync class
    constructor(regex){
        //call the parent class constructor
        super();
        //initalize regex and files array
        this.regex = regex;
        //array to hold added files
        this.files = [];
    }
    //method to find regex in the added files
    addFile(file){
        //add file to the files array
        this.files.push(file);
        return this
    };
    find(){
         //iterate over each file
        for(const file of this.files){
            let content;
            //read the file synchronously
            try{
                content = readFileSync(file, 'utf-8');
            }
            //handle errors
            catch(err){
                this.emit('error', err);
            }
            //emit 'fileread' event with the file name
            this.emit('fileread', file);
            const match = content.match(this.regex);
            if(match){
                match.forEach(elem => this.emit('found', file, elem));
            }
        }
        return this;
    }
}
const findRegexSyncInstance = new FindRegexSync(/hello \w+/g);
//add files and start finding the regex pattern
findRegexSyncInstance.addFile('fileA.txt').addFile('fileB.json')
//listen found events and log matches
.on('found', (file, match) => console.log(`[Before] Matched "${match}"`))
//start finding regex pattern
.find()
//listen found events and log matches
.on('found', (file, match) => console.log(`[After] Matched "${match}"`));

    