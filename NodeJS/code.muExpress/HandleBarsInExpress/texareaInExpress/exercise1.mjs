//ask user to leave feedback and display the feedback after submission

import express from 'express';
import path from 'path';
import expressHandlebars from 'express-handlebars';
import bodyParser from 'body-parser';

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

//use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

//define a route to render the feedback form template
app.get('/', (req, res) => {
    //render the form template to ask for user feedback
    res.render('form');
});

//define a post route to handle form textarea submission and render the result template with the feedback
app.post('/', (req, res) => {
    //render the result template with the feedback from the textarea
    res.render('result', { feedback: req.body.review });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});