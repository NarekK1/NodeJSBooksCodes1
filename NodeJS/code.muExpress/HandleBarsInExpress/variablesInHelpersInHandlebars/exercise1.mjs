//send three variables to handlebars helper previously defined data

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

//create an instance of express-handlebars with default layout, file extension and a helper function with parameters to format date from year-month-day to day-month-year
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers:{
        formatDate: function(dateString){
            const [year, month, day] = dateString.split('-');
            return `${day}-${month}-${year}`;
        }
    }
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs'); 

//define a route to render the page template
app.get('/page', (req, res) => {
    //send the year, month and day variables to the handlebars template
    res.render('page', { year: 2026, month: 7, day: 31 });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});