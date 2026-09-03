//given textarea input we need to count the number of words and symbols and display it on the page using handlebars

import express from 'express';
import path from 'path';
import expressHandlebars from 'express-handlebars';
import bodyParser from 'body-parser';

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

//define a route to render the form template to input text
app.get('/', (req, res) => {
    //render the form template to input text
    res.render('form');
});

app.post('/', (req, res) => {
    //get the input text from the request body
    const inputText = req.body.text;

    //count the number of words in the input text
    const wordCount = inputText.trim().split(/\s+/).length;

    //count the number of symbols in the input text
    const symbolCount = inputText.length;

    //render the result template with the calculated word and symbol counts and the original input text
    res.render('result', { wordCount, symbolCount, inputText });
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});