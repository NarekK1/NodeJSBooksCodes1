import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import fs from 'fs/promises';
import { constants } from 'fs';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create an instance of the express application
const app = express();

//define a single route handler that can handle requests for any page number
app.get('/page/:num', async function(req, res){
    //find the file path for the requested page number
    const path = __dirname + '/pages/' + req.params.num + '.html';

    //send the HTML file for the requested page number to the broweser if it exists, otherwise send a 404 error
    try{
        //check if the file exists
        await fs.access(path, constants.F_OK);
        //send the HTML file for the requested page number to the browser
        res.sendFile(path);
    }
    //catch any errors that occur while checking for the file
    catch(err){
        //send a 404 error if the file does not exist
        res.status(404).send('File not found');
    }
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});