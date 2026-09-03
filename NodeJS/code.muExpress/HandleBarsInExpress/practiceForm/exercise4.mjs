//given two inputs and button return the divisors of both general numbers and display it on the page using handlebars

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

//define a route to render the form template to input two numbers\
app.get('/', (req, res) => {
    //render the form template to input two numbers
    res.render('form');
});


//define a route to handle the form submission and calculate the divisors of the input numbers
app.post('/', (req, res) => {
    //parse the numbers from the request body and convert them to integers
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);

    //validate parsed numbers
    const a = Number.isNaN(num1) ? 0 : num1;
    const b = Number.isNaN(num2) ? 0 : num2;

    //compute common divisors of a and b
    function getCommonDivisors(x, y) {
        //initialize an empty array to store the common divisors
        const result = [];
        //find the minimum of the absolute values of x and y to limit the loop
        const min = Math.min(Math.abs(x), Math.abs(y));

        //if either number is zero, return an empty array as there are no common divisors
        if (min === 0){
             return result;
        }
        //loop through all numbers from 1 to min and check if they are common divisors of x and y
        for (let i = 1; i <= min; i++) {
            //if both x and y are divisible by i, add i to the result array
            if (x % i === 0 && y % i === 0){
                //add i to the result array
                 result.push(i);
            }
        }
        return result;
    }

    //get the common divisors of the input numbers
    const divisors = getCommonDivisors(a, b);

    //render the result template with the calculated divisors and original numbers
    res.render('result', { divisors, num1: a, num2: b });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})