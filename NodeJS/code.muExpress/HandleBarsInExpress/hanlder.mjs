import expressHandlebars from 'express-handlebars';
import express from 'express';

//create an instance of express
const app = express();

//create an instance of express handlebars
const handlebars = expresHandlebars.create({
    // Specify the default layout and file extension for handlebars templates
    defaultLayout: 'main',
    // Specify the file extension for handlebars templates
    extname: 'hbs'
});

//register handlebars as the view engine for the express app
app.engine('hbs', handlebars.engine);
//set the view engine to handlebars
app.set('view engine', 'hbs');