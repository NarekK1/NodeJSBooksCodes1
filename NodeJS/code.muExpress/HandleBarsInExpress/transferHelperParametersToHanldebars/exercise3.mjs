//make an helper function that sums three values

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars from 'express-handlebars';

//create an instance of express
const app = express();

//get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//set the view directory for handlebars templates
app.set('views', path.join(__dirname, 'views'));

//create an instance of express-handlebars with default layout, file extension and a helper function with parameters to sum three numbers
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        sumThree: function(num1, num2, num3){
            return num1 + num2 + num3;
        }
    }
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//define a route to render the page template
app.get('/page', (req, res) => {
    res.render('page');
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});