//send text with href to the handlebars template and display them in the browser

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

//create an instance of express-handlebars with default layout and file extension
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
//set the extension of the handlebars templates to .hbs
app.set('view engine', 'hbs');

//define a route that renders a page with text and href passed as data to the handlebars template
app.get('/exercise1/text', (req, res) => {
    //render the exercise1 template with text and href passed as data to the handlebars template
    res.render('exercise1', { link: 'https://www.google.com', text: 'Click here to go to Google' });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
