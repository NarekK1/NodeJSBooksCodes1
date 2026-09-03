import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create an instance of the express application
const app = express();

//define routes to serve HTML files for each page
app.get('/page/1/', (req, res) => {
    //send the HTML file for page 1 as a response
    res.sendFile(path.join(__dirname, 'pages', '1.html'));
});

//define routes to serve HTML files for each page
app.get('/page/2/', (req, res) => {
    //send the HTML file for page 2 as a response
    res.sendFile(path.join(__dirname, 'pages', '2.html'));
});

//define routes to serve HTML files for each page
app.get('/page/3/', (req, res) => {
    //send the HTML file for page 3 as a response
    res.sendFile(path.join(__dirname, 'pages', '3.html'));
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})