//make footer and haeder as partials

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars from 'express-handlebars';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create an instance of express application
const app = express();

//set the views directory for handlebars templates
app.set('views', path.join(__dirname, 'views'));

//create an instance of express-handlebars with default layout, file extension and partials directory
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    partialsDir: path.join(__dirname, 'views', 'partials')
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
//set the extension of the handlebars templates to .hbs
app.set('view engine', 'hbs');

//defin a route that renders a page with a title passed as data to the handlebars template
app.get('/page', (req, res) => {
    //render the page template with the title passed as data to the handlebars template
    res.render('page', { title: 'Main Page' });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});