import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create an instance of the Express application
const app = express();

//define route handler for each page
app.get('/page/1', (req, res) => {
    //send the HTML file for page 1 to the browser
    res.sendFile(__dirname + '/pages/1.html');
});

//define route handler for each page
app.get('/page/2', (req, res) => {
    //send the HTML file for page 2 to the browser
    res.sendFile(__dirname + '/pages/2.html');
});

//define route handler for each page
app.get('/page/3', (req, res) => {
    //send the HTML file for page 3 to the browser
    res.sendFile(__dirname + '/pages/3.html');
});


//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});