//with help of form send user name after sending the form say hi to user with his name and hide the form after sending the data

import express from 'express';
import path from 'path';
import expressHandlebars from 'express-handlebars';

//create an instance of express application
const app = express();

//set the view directory for handlebars templates
app.set('views', path.join(import.meta.dirname, 'views'));

//create an instance of express-handlebars with default layout and file extension
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//define a route to render the form template to ask for user name and hide the form after sending the data
app.get('/', (req, res) => {
    if (req.query.submit) {
        res.render('result', { name: req.query.name });
    }
    else {
        res.render('form');
    }
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});