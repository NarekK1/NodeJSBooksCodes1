//given 3 inputs check that input for Pifagorean triangle and display it on the page using handlebars

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

//define a route to render the form template to input three numbers
app.get('/', (req, res) => {
    //render the form template to input three numbers
    res.render('form');
});

//define a route to handle the form submission and check if the input numbers can form a Pythagorean triangle
app.post('/', (req, res) => {
    //parse the numbers from the request body and convert them to integers
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);
    const num3 = parseInt(req.body.num3);

    //check if the input numbers can form a Pythagorean triangle using the Pythagorean theorem
    function isPythagoreanTriangle(a, b, c){
        //sort the numbers in ascending order to identify the hypotenuse
        const sides = [a, b, c].sort((x, y) => x - y);

        //check if the sum of the squares of the two smaller sides equals the square of the largest side
        return sides[0] * sides[0] + sides[1] * sides[1] === sides[2] * sides[2];
    }
    //check if the input numbers can form a Pythagorean triangle
    const result = isPythagoreanTriangle(num1, num2, num3);

    //render the result template with the result of the Pythagorean triangle check and the original numbers
    res.render('result', { result, num1, num2, num3 });
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});