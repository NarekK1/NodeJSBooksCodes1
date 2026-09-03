//get three coefficients from the user input and display the roots of the quadratic equation on the page using handlebars

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

//define a route to render the form template to input three coefficients
app.get('/', (req, res) => {
    //render the form template to input three coefficients
    res.render('form');
});

//define a route to handle the form submission and calculate the roots of the quadratic equation
app.post('/', (req, res) => {
    //parse the coefficients from the request body and convert them to integers
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);
    const num3 = parseInt(req.body.num3);

    //if the first coefficient is zero, return an error message as it is not a quadratic equation
    if(num1 === 0){
        //return an error message as it is not a quadratic equation
        return res.send('The first coefficient cannot be zero for a quadratic equation.');
    }

    //calculate the discriminant of the quadratic equation using the formula b^2 - 4ac
    const discriminant = num2 * num2 - 4 * num1 * num3;

    //if the discriminant is negative, return a message indicating that there are no real roots for the quadratic equation
    if(discriminant < 0){
        //return a message indicating that there are no real roots for the quadratic equation
        return res.send('The equation has no real roots.');
    }
    //if the discriminant is zero, calculate the single real root using the formula -b / 2a and return it
    else if(discriminant === 0){
        //calculate the single real root using the formula -b / 2a
        const root = -num2 / (2 * num1);
        //return the single real root
        return res.send(`The equation has one real root: ${root}`);
    }
    //if the discriminant is positive, calculate the two real roots using the quadratic formula and return them
    else{
        //calculate the two real roots using the quadratic formula
        const root1 = (-num2 + Math.sqrt(discriminant)) / (2 * num1);
        //calculate the second real root using the quadratic formula
        const root2 = (-num2 - Math.sqrt(discriminant)) / (2 * num1);
        //return the two real roots
        return res.send(`The equation has two real roots: ${root1} and ${root2}`);
    }
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});