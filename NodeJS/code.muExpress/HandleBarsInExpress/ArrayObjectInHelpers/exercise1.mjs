//run on all purchases and return the total amount multiplied by the quantity

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

//create an instance of express-handlebars with default layout, file extension and a helper function to return the total amount multiplied by the quantity
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        total: function(purchase){
            return purchase.name + ' ' + purchase.cost * purchase.amount;
        }
    }
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//define a route to render user object template
app.get('/page', (req, res) => {
    res.render('page', {
        purchases: [
		{
			name: 'purch1',
			cost: 1000,
			amount: 5
		},
		{
			name: 'purch2',
			cost: 2000,
			amount: 6
		},
		{
			name: 'purch3',
			cost: 3000,
			amount: 7
		},
	],
});
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});