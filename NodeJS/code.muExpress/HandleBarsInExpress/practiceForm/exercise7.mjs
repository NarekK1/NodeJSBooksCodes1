//given input with date we need to count the days from the date to today and display it on the page using handlebars

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

//define a route to render the form template to input a date
app.get('/', (req, res) => {
    //render the form template to input a date
    res.render('form');
});

//define a route to handle the form submission and calculate the number of days from the input date to today
app.post('/', (req, res) => {
    //parse the date from the request body and convert it to a Date object
    const inputDate = new Date(req.body.date);

    //get the current date
    function getCurrentDate(){
        const date = new Date();
        //return the current date in YYYY-MM-DD format
        return date.toISOString().split('T')[0];
    }

    const currentDate = new Date(getCurrentDate());

    //calculate the difference in time between the current date and the input date
    const timeDifference = currentDate - inputDate;

    //calculate the number of days from the time difference
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    //render the result template with the calculated number of days and the original input date
    res.render('result', { daysDifference, inputDate: inputDate.toISOString().split('T')[0] });
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});