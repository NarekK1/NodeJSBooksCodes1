// Create a helper that will take a date in year-month-day format as a parameter and return the day of the week on which this date falls.

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

//create an instance of express-handlebars with default layout, file extension and a helper function
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        getDayOfWeek: function(dateString){
            const [year, month, day] = dateString.split('-');
            const date = new Date(year, month - 1, day);

            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            return daysOfWeek[date.getDay()];
        }
    }
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//define a route to render the page template
app.get('/page', (req, res) => {
    //render the page template
    res.render('page');
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');  
});