//make any local helper

import express from 'express';
import expressHandlebars from 'express-handlebars';
import path from 'path'; 

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

//define a route to render the page.hbs template and a helper function to sum two numbers and return the result
app.get('/page', (req, res) => {
    res.render('page', { 
        helpers: {
            sum: function(a, b){
                return a + b;
            }
        }
    });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});