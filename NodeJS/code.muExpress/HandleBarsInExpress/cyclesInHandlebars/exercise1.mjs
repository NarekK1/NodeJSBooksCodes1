//send the array to handlebars template with the each command

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars from 'express-handlebars';

//array of products to be sent to handlebars template
const products = ['prod1', 'prod2', 'prod3'];

//create an instance of express application
const app = express();

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//set the view directory for handlebars templates
app.set('views', path.join(__dirname, 'views'));

//create an instance of express-handlebars with default layout and file extension
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
//set the view engine to handlebars
app.set('view engine', 'hbs');

//define a route for the page that renders the page.hbs template and passes the products array to it
app.get('/page', (req, res) => {
    //render the page.hbs template and pass the products array to it
    res.render('page', { products: products });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
