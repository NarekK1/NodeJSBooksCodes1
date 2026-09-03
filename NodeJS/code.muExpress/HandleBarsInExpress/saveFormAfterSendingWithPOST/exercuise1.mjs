//ask user login,password and email and save the data after sending the form with POST method

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import expressHandlebars from 'express-handlebars';

//create an instance of express application
const app = express();

//parse form data from POST requests
app.use(bodyParser.urlencoded({ extended: true }));

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

//define a route to render the form template to ask for user login, password and email and save the data after sending the form with POST method
app.get('/', (req, res) => {
    //render the form template
    res.render('form');
});

app.post('/', (req, res) => {
    //render the result template with the form data
    res.render('result', {
        email: req.body.email,
        password: req.body.password,
        login: req.body.login
    });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})