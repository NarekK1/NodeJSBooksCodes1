//send the object in render with two variables to handlebars template with the with command

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import expressHandlebars from 'express-handlebars';

//get the current file path and directory name
const app = express();

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//set the views directory for handlebars templates
app.set('views', path.join(__dirname, 'views'));

//create an instance of express-handlebars with default layout, file extension
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
//set the view engine to handlebars
app.set('view engine', 'hbs');

//define a route that renders a page with an object passed as data to the handlebars template
app.get('/page', (req, res) => {
    //pass the product object to the handlebars template using the with command
    res.render('page', { amount: 10, product: { name: 'prod', cost: 1000, amount: 5 } });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});