import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars from 'express-handlebars';

//create an instance of express
const app = express();

//get the current directory name and file name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//set the view directory for handlebars templates
app.set('views', path.join(__dirname, 'views'));

//create an instance of express-handlebars with default layout and file extension
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//define a route for the page that renders the page.hbs template and passes the show variable to it
app.get('/page', (req, res) => {
    //render the page.hbs template and pass the show variables to it for the if, else and unless conditions
    res.render('page', { show1: true, show2: false, show3: true });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})