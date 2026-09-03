//rework global helper for some url

import express from 'express';
import expressHandlebars from 'express-handlebars';
import path from 'path';

//create an instance of express application
const app = express();

//set the view directory for handlebars templates
app.set('views', path.join(import.meta.dirname, 'views'));

//create an instance of express-handlebars with default layout, file extension and global helper to format a url
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        formatUrl: function(url){
            return url.replace(/ /g, '-').toLowerCase();
        }
    }
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//define a route to render the page.hbs template and a local helper function to format a url
app.get('/page', (req, res) => {
    //render the page.hbs template and pass a local helper function to format a url
    res.render('page', {
        helpers: {
            formatUrl: function(url){
                return url.replace(/ /g, '-').toUpperCase();
            }
        }
    })
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});