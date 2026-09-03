import express from 'express';
import path from 'path';
import expressHandlebars from 'express-handlebars';

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

//define a route to render the form.hbs template and send the query parameters to the template
app.get('/', (req, res) => {
    //if the query parameters test1 and test2 are defined, render the form.hbs template, otherwise render the result.hbs template
    if(req.query.test1 !== undefined && req.query.test2 !== undefined){
        res.render('form')
    }
    else{
        res.render('result');
    }
});

//start the server on port 3000 and log a message to the console
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});