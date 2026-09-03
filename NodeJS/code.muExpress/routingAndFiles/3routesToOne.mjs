import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create an instance of the Express application
const app = express();

//define a single route handler that can handle requests for any page number
app.get('/page/:num', function(req, res){
    //send the HTML file for the requested page number to the browser
    res.sendFile(__dirname + '/pages/' + req.params.num + '.html');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});