import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars from 'express-handlebars';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create an instance of express application
const app = express();

//set the views directory for handlebars templates
app.set('views', path.join(__dirname, 'views'));

//create an instance of express-handlebars with default layout, file extension
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
//set view engine to handlebars
app.set('view engine', 'hbs');

//define a route that renders a page with an object passed as data to the handlebars template
app.get('/page', function(req, res){
    //pass an object with user data to the handlebars template
    res.render('page', { user: { name: 'john', age: 30 }});
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

