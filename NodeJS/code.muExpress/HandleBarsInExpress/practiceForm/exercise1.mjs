//create input and tranfer celsius to fahrenheit

import express from 'express';
import path from 'path';
import expressHandlebars from 'express-handlebars';
import bodyParser from 'body-parser';

//create an instance of express application
const app = express();

//parse the request body as urlencoded data
app.use(express.urlencoded({ extended: true }));

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

//define a route to render the form template to choose items
app.get('/', (req, res) => {
    //render the form template to choose items
    res.render('form');
});

//define a route to handle the form submission and convert Celsius to Fahrenheit
app.post('/', (req, res) => {
    //parse the Celsius value from the request body and convert it to a float
    const celsius = parseFloat(req.body.Celsius);

    //convert Celsius to Fahrenheit using the formula F = C * 9/5 + 32
    const fahrenheit = (celsius * 9/5) + 32;

    //render the result template with the converted Fahrenheit value
    res.render('result', { fahrenheit });
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});