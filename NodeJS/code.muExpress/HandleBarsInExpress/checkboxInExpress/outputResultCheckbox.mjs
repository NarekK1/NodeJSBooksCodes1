import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import expressHandlebars from 'express-handlebars';

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

//define a route to render the checkbox form template
app.get('/', (req, res) => {
    //render the form template to check the checkbox and display the result template after submission
    res.render('form');
});

//define a post route to handle form submission and render the result template
app.post('/', (req, res) => {
    //render the result template based on the checkbox value
    res.render('form', { body: req.body });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});