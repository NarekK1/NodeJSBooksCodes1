//send few models to the template and use a different layout for the page template

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars from 'express-handlebars';

//create an istance of express application
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
app.set('view engine', 'hbs');

//define a route for the root path that renders the index template with some data
app.get('/page', (req, res) => {
    //render the page template with some data and specify the layout to use
    res.render('page', { test: 'data', layout: 'admin' });
});

//define a route for the contact page that renders the page template with some data and specify the layout to use
app.get('/page/contact', (req, res) => {
    //render the page template with some data and specify the layout to use
    res.render('page', { test: 'data', layout: 'contact' });
});

//define a route for the about page that renders the page template with some data and specify the layout to use
app.get('/page/about', (req, res) => {
    //render the page template
    res.render('page', { test: 'data', layout: 'about' });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})
