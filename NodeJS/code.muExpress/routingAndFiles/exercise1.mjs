import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { constants } from 'fs';

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//define paths for script, about, and pages directories
const scriptPath = path.join(__dirname, 'script');
const about = path.join(__dirname, 'about');
const pages = path.join(__dirname, 'pages');

//create an instance of the Express application
const app = express();

//define route handlers for script, about, and pages    
app.get('/script/:name', (req, res) => {
    //send the JavaScript file for the requested name to the browser
    res.sendFile(scriptPath + '/' + req.params.name + '.js');
});


//define route handlers for about and pages
app.get('/about/:name', (req, res) => {
    //send the HTML file for the requested name to the browser
    res.sendFile(about + '/' + req.params.name + '.html');
});

//define route handler for pages
app.get('/pages/:num', (req, res) => {
    //send the HTML file for the requested page number to the browser
    res.sendFile(pages + '/' + req.params.num + '.html');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});