import { default as express } from 'express';
import { NotesStore as notes } from '../app.mjs';
//export router object to be used in app.mjs to define the route for /notes CommondJS style
export const router = express.Router();

//get /add - display form for adding a new note
router.get('/add', (req, res, next) => {
    //render the noteedit view
    res.render('noteedit', {
        //set the title to Add Note
        title: 'Add a Note',
        docreate: true,
        notekey: '',
        note: undefined
    });
});

//get /save - display form for editing an existing note
router.post('/save', async (req, res, next) => {
    //try to save the note
    try{
        let note;
        //if docreate is true, create a new note, otherwise update the existing note
        if(req.body.docreate === 'create'){
            //create a new note with the provided notekey, title and body
            note = await notes.create(req.body.notekey, req.body.title, req.body.body);
        }
        //if docreate is not true, update the existing note with the provided notekey, title and body
        else{
            note = await notes.update(req.body.notekey, req.body.title, req.body.body);
        }
        //redirect to the view page for the note
        res.redirect('/notes/views?key=' + req.body.notekey);
    }
    //if there is an error, pass it to the next middleware
    catch(err){
        next(err);
    }
});

//get /view - display the note with the provided notekey
router.get('/view', async (req, res, next) => {
    //try to get the note with the provided notekey
    try{
        //get the note with the provied notekey
        let note = await notes.read(req.query.key);
        //render the noteview view with the note data
        res.render('noteview', {
            //set the title to the note title if the note exists, otherwise set it to an empty string
            title: note ? note.title : "",
            //set the notekey to the provided notekey
            notekey: req.query.key,
            //set the note data to the note if it exists, otherwise set it to undefined
            note: note
        })
    }
    //if there is an error, pass it to the next middleware
    catch(err){
        next(err);
    }
});

//get /edit - display the form for editing the note with the provided notekey
router.get('/edit', async (req, res, next) => {
    //try to get the note with the provided notekey
    try{
        //get the note with the provided notekey
        const note = await notes.read(req.query.key);
        //render the noteedit view with the note data
        res.render('noteedit', {
            //set the title to Edit Note if the note exists, otherwise set it to Add Note
            title: note ? ("Edit " + note.title) : "Add a Note",
            //set docreate to false if the note exists, otherwise set it to true
            docreate: false,
            //set the notekey to the provided notekey
            notekey: req.query.key,
            //set the note data to the note if it exists, otherwise set it to undefined
            note: note
        });
    }
    //if there is an error, pass it to the next middleware
    catch(err){
        next(err);
    }
});

//get /destroy - display the form for deleting the note with the provided notekey
router.get('/destroy', async (req, res, next) =>{
    //try to get the note with the provided notekey
    try{
        //get the note with the provided notekey
        const note = await notes.read(req.query.key);
        //render the notedestroy view with the note data
        res.render('notedestroy', {
            //set the title to Delete note if the note exists, otherwise set it to an empty string
            title: note ? `Delete ${note.title}` : "",
            //set the notekey to the provided notekey
            notekey: req.query.key,
            //set the note data to the note if it exists, otherwise set it to undefined
            note: note 
        });
    }
    //if there is an error, pass it to the next middleware
    catch(err){
        next(err);
    }
});

//post /destroy/confirm - delete the note with the provided notkey
router.post('/destroy/confirm', async (req, res, next) => {
    //try to delete the note with the provided notekey
    try{
        //delete the note with the provided notekey
        await notes.destroy(req.body.notekey);
        //redirect to the home page
        res.redirect('/');
    }
    //if there is an error, pass it to the next middleware
    catch(err){
        next(err);
    }
})