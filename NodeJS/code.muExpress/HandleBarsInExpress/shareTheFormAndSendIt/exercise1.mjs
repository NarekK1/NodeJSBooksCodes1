//send form with 5 numbers and display the numbers in result.hbs

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

//define a route to render the form.hbs template and send 5 numbers to result.hbs template
app.get('/', (req, res) => {
    //numbers from query parameters
    const num1 = Number(req.query.test1);
    const num2 = Number(req.query.test2);
    const num3 = Number(req.query.test3);
    const num4 = Number(req.query.test4);
    const num5 = Number(req.query.test5);
    //sum of the numbers
    const sum = num1 + num2 + num3 + num4 + num5;

    //if the query parameter submit is defined, render the result.hbs template, otherwise render the form.hbs template
    if(req.query.submit){
        res.render('result', {sum: sum});
    }
    else{
        res.render('form');
    }
});

//start the server on port 3000 and log a message to the console
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});