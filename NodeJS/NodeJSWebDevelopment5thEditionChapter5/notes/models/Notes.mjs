//create a note Symbol for each private property of the Note class
const _note_key = Symbol('key');
const _note_title = Symbol('title');
const _note_body = Symbol('body');

//create a Note class with a constructor
export class Note {
    //takes in a key, tittle, and body and assigns them to the private properties
    constructor(key, title, body){
        //assign the key
        this[_note_key] = key;
        //assign the title
        this[_note_title] = title;
        //assign the body
        this[_note_body] = body;
    }
    //create getter
    get key(){
        //return the key
        return this[_note_key];
    }
    //create getter title 
    get title(){
        //return the title
        return this[_note_title];
    }
    //create setter title
    set title(newTitle){
        //set the title to the new title
        this[_note_title] = newTitle;
    }
    //create getter body
    get body(){
        //return the body
        return this[_note_body];
    }
    //create setter body
    set body(newBody){
        //set the body to the new body
        this[_note_body] = newBody;
    }
}

//create an abstract class for the NotesStore
export class AbstractNotesStore{
    //create an async close method
    async close(){

    }
    //create an async update method that takes in a key, title, and body
    async update(key, title, body){

    }
    //create an async create method that takes in a key, title, and body
    async create(key, title, body){

    }
    //create an async read method that takes in a key
    async read(key){

    }
    //create an async destroy method that takes in a key
    async destroy(key){

    }
    //create an async keylist method that returns a list of all the keys
    async keylist(){

    }
    //create an async count method
    async count(){

    }
}