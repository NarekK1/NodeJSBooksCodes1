//ask user for their gender and display a message based on their selection

import express from 'express';
import path from 'path';
import expressHandlebars from 'express-handlebars';
import bodyParser from 'body-parser';

//create an instance of express application
const app = express();

//parse the request body as urlencoded data
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

//define a route to render the form template with radio buttons for gender selection
app.get('/', (req, res) => {
    //render the form template with radio buttons for gender selection
    res.render('form');
});

//define a post route to handle form submission and display a message based on the selected gender
app.post('/', (req, res) => {
    //display the selected gender from the request
    res.send(req.body.radio);
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});