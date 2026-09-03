//send a num of three numbers and return the sum of the three numbers as a response

import express from 'express';
import expressHandlebars from 'express-handlebars';
import path from 'path';

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

//define a route to render the form.hbs template
app.get('/', (req, res) => {
    //render the form.hbs template
    res.render('form');
});

//define a route to handle the GET request from the form submission and log the query parameters and return the sum of the three numbers as a response
app.get('/target', (req, res) => {
    //the numbers to be summed are sent as query parameters in the GET request
    const num1 = Number(req.query.test1);
    const num2 = Number(req.query.test2);
    const num3 = Number(req.query.test3);
    const sum = num1 + num2 + num3;

    //send the sum as a response
    res.send(`result: ${sum}`);
});

//start the server on port 3000 
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});                                      