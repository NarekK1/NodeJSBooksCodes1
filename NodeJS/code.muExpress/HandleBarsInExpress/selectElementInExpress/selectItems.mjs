import express from 'express';
import path from 'path';
import expressHandlebars from 'express-handlebars';

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

//define a post route to handle form submission and render the result template to log the selected items
app.post('/', (req, res) => {
    //log the selected items to the console
    console.log(req.body.test);
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});