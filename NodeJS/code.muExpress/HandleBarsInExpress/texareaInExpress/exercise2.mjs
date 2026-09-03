//output textarea value in russian language and after submission display the value in english the result template

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

function translateToEnglish(st){
    const map
}

//define a route to render the feedback form template
app.get('/', (req, res) => {
    //render the form template to ask for user feedback
    res.render('form');
});

app.post('/', (req, res) => {
    res.render('result', {

    })
})