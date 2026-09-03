//ask the user if they are 18 years old or older and give access to the site if they are and deny access if they are not

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

//define a route to render the age verification form template
app.get('/', (req, res) => {
    res.render('form');
});

//define a post route to handle form submission and render the result template
app.post('/result', (req, res) => {
    //check if the checkbox is checked and render the result template accordingly
    const isAdult = req.body.adult === 'on';

    //render the result template with access granted or denied message
    if (isAdult) {
        //render the result template with access granted message
        res.render('result', {
            access: true,
            message: 'Access granted. You can enter the site.'
        });
    } 
    //render the result template with access denied message
    else {
        //render the result template with access denied message
        res.render('result', {
            access: false,
            message: 'Access denied. You must be 18 years or older to access this site.'
        });
    }
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});