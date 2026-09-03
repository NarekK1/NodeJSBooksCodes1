import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars from 'express-handlebars';

//create an instance of express application
const app = express();

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//set the view directory for handlebars templates
app.set('views', path.join(__dirname, 'views'));

//create an instance of express-handlebars with default layout, file extension and a helper function to generate a link with the given URL and text
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        link: function(href, ancor){
            return '<a href="' + href + '">' + ancor + '</a>';
        }
    }
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//define a route to serve the index.html file
app.get('/index.html', (req, res) => {
    //send the index.html file located in the current directory
    res.sendFile(path.join(__dirname, 'index.html'));
});

//define a route to render user object template
app.get('/page', (req, res) => {
    res.render('page');
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});