import  expressHandlebars from "express-handlebars";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create an instance of express
const app = express();

//set the views directory for handlebars templates
app.set('views', path.join(__dirname, 'views'));

//create an instance of express handlebars
const handlebars = expressHandlebars.create({
    // Specify the default layout and file extension for handlebars templates
    defaultLayout: 'main',
    // Specify the file extension for handlebars templates
    extname: 'hbs'
});

//register handlebars as the view engine for the express app
app.engine('hbs', handlebars.engine);
//set the view engine to handlebars
app.set('view engine', 'hbs');

//define routes for the pages
app.get('/page/1', function(req, res){
    //render the page1 template using the main layout
    res.render('page1');
});

//define routes for the pages
app.get('/page/2', function(req, res){
    //render the page2 template using the main layout
    res.render('page2');
});

//define routes for the pages
app.get('/page/3', function(req, res){
    //render the page3 template using the main layout
    res.render('page3');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});