//count the factorial of a number from the user input and display it on the page using handlebars

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

//define a route to render the form template to input a number
app.get('/', (req, res) => {
    //render the form template to input a number
    res.render('form');
});

//define a route to handle the form submission and calculate the factorial of the input number
app.post('/', (req, res) => {
    //parse the number from the request body and convert it to an integer
    const number = parseInt(req.body.factorial);

    //calculate the factorial of the number using a recursive function
    function factorial(n){
        //base case: if n is 0 or 1, return 1
        if(n === 0 || n === 1){
            return 1;
        }

        //calculate the factorial recursively
        return n * factorial(n - 1);
    }

    //calculate the factorial of the input number
    const result = factorial(number);

    //render the result template with the calculated factorial value and original number
    res.render('result', { result, number });
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});