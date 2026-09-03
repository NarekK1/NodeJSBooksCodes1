//given textarea and button input we need to count the percentage of every symbol and display it on the page using handlebars

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

//define a route to render the form template to input text
app.get('/', (req, res) => {
    //render the form template to input text
    res.render('form');
});

//define a route to handle the form submission and calculate the percentage of symbols in the input text
app.post('/', (req, res) => {
    //get the input text from the request body
    const inputText = req.body.text;
    // handle empty input
    if (!inputText || inputText.length === 0) {
        //render the result template with empty symbols array and total count of 0
        return res.render('result', { inputText: '', symbols: [], total: 0 });
    }

    // count frequency of every character (symbol)
    const counts = new Map();
    //iterate trough each character in the input text and update the count in the map
    for (const ch of inputText) {
        //update the count of the character in the map, if it doesn't exist initialize it to 0 and add 1
        counts.set(ch, (counts.get(ch) || 0) + 1);
    }

    //calculate the total number of symbols in the input text
    const total = inputText.length;

    // build an array of symbols with percentages and readable labels
    const symbols = Array.from(counts.entries()).map(([symbol, count]) => {
        //create a label for the symbol to make it more readable
        let label = symbol;
        //check if the symbol is a whitespace character and assign a more readable label
        if (symbol === ' '){ 
            //if the symbol is a space, assign the label '[space]'
            label = '[space]';
        }
        //check if the symbol is a newline character and assign a more readable label
        else if (symbol === '\n'){
            //if the symbol is a newline, assign the label '[newline]'
             label = '[newline]';
        }
        //check if the symbol is a tab character and assign a more readable label
        else if (symbol === '\t'){ 
            //if the symbol is a tab, assign the label '[tab]'
            label = '[tab]';
        }
        //check if the symbol is a carriage return character and assign a more readable label
        else if (symbol === '\r'){
            //if the symbol is a carriage return, assign the label '[cr]'
             label = '[cr]';
        }
        //return an object with the symbol, its label, count, and percentage of total symbols
        return {
            symbol,
            label,
            count,
            percentage: Number(((count / total) * 100).toFixed(2))
        };
    });

    // sort by descending count
    symbols.sort((a, b) => b.count - a.count);

    // render the result template with the symbols array and original text
    res.render('result', { inputText, symbols, total, title: 'Symbol percentages' });
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});