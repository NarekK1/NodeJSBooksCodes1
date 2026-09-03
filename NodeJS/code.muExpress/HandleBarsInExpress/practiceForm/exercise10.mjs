//given 3 selects days from 1 to 31, months from January to December, years from 1990 to 2025, we need to get the selected date day of week and display it on the page using handlebars

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

//create an instance of express-handlebars with default layout,file extension and a helper function to generate a range of numbers for the select options
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        range: function(start, end){
            //create an array of numbers from start to end
            const arr = [];
            //iterate from start to end and push each number to the array
            for(let i = start; i <= end; i++){
                arr.push(i);
            }
            return arr;
        }
    }
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//define a route to render the form template to input text
app.get('/', (req, res) => {
    //render the form template to input text
    res.render('form');
});

//define a route to handle the form submission and calculate the day of the week for the selected date
app.post('/', (req, res) => {
    //get the selected day, month and year from the request body
    const { day, month, year } = req.body;

    //if any of the date components are missing, render the result template with an error message
    if(!day || !month || !year){
        //render the result template with an error message if any of the date components are missing
        return res.render('result', { result: "Choose a valid date" });
    }

    //create a new date object with the selected day, month and year
    const date = new Date(year, month, day);

    //days of the week array to get the day of the week from the date object
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    //get the day of the week from the date object using getDay() method and use it to get the corresponding day name from the days array
    const weekDay = days[date.getDay()];

    //render the result template with the calculated day of the week and the original selected date
    res.render('result', { result: `The day of the week for ${day}/${month}/${year} is ${weekDay}` });
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});