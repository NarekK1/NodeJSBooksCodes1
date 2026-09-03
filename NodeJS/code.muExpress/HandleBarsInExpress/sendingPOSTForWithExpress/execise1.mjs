//ask the user for his nam, city and country and output the data in the result page using handlebars and express

import express from 'express';
import path from 'path';
import expressHandlebars from 'express-handlebars';
import bodyParser from 'body-parser';

//create an instance of express application
const app = express();

//set the view directory for handlebars templates
app.set('views', path.join(import.meta.dirname, 'views'));

//parse form data from POST requests
app.use(bodyParser.urlencoded({ extended: true }));

//create an instance of express-handlebars with default layout and file extension
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//get route to render the form template to ask for user name, city and country
app.get('/', (req, res) => {
    //render the result template with the user name, city and country
    res.render('form');
});

//post route to handle form submission and render the result template
app.post('/target', (req, res) => {
    //render the result template with the user name, city and country
    res.render('result', {
        name: req.body.name,
        city: req.body.city,
        country: req.body.country
    });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});