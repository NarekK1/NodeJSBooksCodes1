import { Note, AbstractNotesStore } from './Notes.mjs';

const notes = [];

//this is a simple in-memory implementation of the NotesStore interface
export class InMemoryNotesStore extends AbstractNotesStore {

    //for an in-memory store update overwrite the existing note
    async update(key, title, body){
        //if the node doesn't exist create it
        notes[key] = new Note(key, title, body);
        //return the updated note
        return notes[key];
    }
    //for an in-memory store create is the same as update
    async create(key, title, body){
        //if the node doesn't exist create it
        notes[key] = new Note(key, title, body);
        //return the created note
        return notes[key];
    }
    //for an in-memory store read is just a lookup in the notes object
    async read(key){
        //if the note exists return it
        if(notes[key]){
            //return the note
            return notes[key];
        }
        //if the note doesn't exist throw an error
        else{
            throw new Error(`Note ${key} does not exist`);
        }
    }
    //for an in-memory store destroy is just a delete from the notes object
    async destroy(key){
        //if the note exists delete it
        if(notes[key]){
            delete notes[key];
        }
        //throw an error if the note doesn't exist
        else{
            throw new Error(`Note ${key} does not exist`);
        }
    }
    //for an in-memory store keylist is just a return of the keys of the notes object
    async keylist(){
        //return the keys of the notes object
        return Object.keys(notes);
    }
    //for an in-memory store count is just the length of the notes object
    async count(){
        //return the length of the notes object
        return notes.length;
    }
}