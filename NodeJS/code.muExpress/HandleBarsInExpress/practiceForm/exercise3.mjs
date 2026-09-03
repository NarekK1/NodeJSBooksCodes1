//given a number as input from the user and button return the divisiors of that number and display it on the page using handlebars

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

//definea a route to render the form template to input a number
app.get('/', (req, res) => {
    //render the form template to input a number
    res.render('form');
});

//define a route to handle the form submission and calculate the divisors of the input number
app.post('/', (req, res) => {
    //parse the number from the request body and convert it to an integer
    const number = parseInt(req.body.divisors);

    //get the divisors of the input number
    function getDivisors(n) {
        //initialize an empty array to store the divisors
        const result = [];

        //loop through all numbers from 1 to n and check if they are divisors of n
        for(let i = 1; i <= n; i++){
            //if n is divisible by i, add i to the result array
            if(n % i === 0){
                //add i to the result array
                result.push(i);
            }
        }
        return result;
    }

    //get the divisors of the input number
    const divisors = getDivisors(number);

    //render the result template with the calculated divisors and original number
    res.render('result', { divisors, number });
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});