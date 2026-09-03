//save user client, age, salary in handlebars form

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

//define a route to render the form.hbs template and send the query parameters to the template
app.get('/', (req, res) => {
    //render the form.hbs template and pass the query parameters to it
    res.render('form', { query: req.query });
});

//start the server on port 3000 and log a message to the console
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});