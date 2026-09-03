//send an array to the handlebars template

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars from 'express-handlebars';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create an instance of express application
const app = express();

//array of products that will be sent to the handlebars template
const products = ['prod1', 'prod2', 'prod3'];

//set the views directory for handlebars templates
app.set('views', path.join(__dirname, 'views'));

const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
//set the extension of the handlebars template to .hbs
app.set('view engine', 'hbs');

//define a route that renders a page with an array passed as data to the handlebars template
app.get('/page', (req, res) => {
    //render the page.hbs template and pass the products array as data 
    res.render('page', { products: products });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});