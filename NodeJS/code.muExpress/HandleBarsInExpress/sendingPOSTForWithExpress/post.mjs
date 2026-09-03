import express from 'express';
import path from 'path';
import expressHandlebars from 'express-handlebars';
import bodyParser from 'body-parser';

//create an instance of express application
const app = express();

//set the view directory for handlebars templates
app.set('views', path.join(import.meta.dirname, 'views'));

//use body-parser middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

//create an instance of express-handlebars with default layout and file extension
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//define a route to render the form template
app.get('/', (req, res) => {
    //render the form template
    res.render('form');
});

//post route to handle form  submission and render the result template
app.post('/target', (req, res) => {
    //log the request body to the console
    console.log(req.body);
    //render the result template
    res.render('result')
});

//start the server on port 3000 and log a message to the console
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});