import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars from 'express-handlebars';

//get the current file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create an instance of express
const app = express();

//set the views directory for handlebars templates
app.set('views', path.join(__dirname, 'views'));

//create an instance of express-handlebars with default layout and file extension
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
//set the extension of the handlebars templates to .hbs
app.set('view engine', 'hbs');

//define routes that render page with different titles passed as data to the handlebars template
app.get('/page/1', (req, res) => {
    //render the page template with the title passed as data to the handlebars template
    res.render('page', { title: 'title 1' });
});

//define routes that render page with different titles passed as data to the handlebars template
app.get('/page/2', (req, res) => {
    //render the page template with the title passed as data to the handlebars template
    res.render('page', { title: 'title 2' });
});

//define routes that render page with different titles passed as data to the handlebars template
app.get('/page/3', (req, res) => {
    //render the page template with the title passed as data to the handlebars template
    res.render('page', { title: 'title 3' });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
