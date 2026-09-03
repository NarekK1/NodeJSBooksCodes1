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

//create an instance of express-handlebars with default layout, file extension and a helper function to return user name and surname
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        format: function(){
            return this.name + ' ' + this.surname;
        }
    }
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//define a route to render user object template
app.get('/page', (req, res) => {
    res.render('page', {
        		users: [
			{
				name: 'name1',
				surname: 'surname1'
			},
			{
				name: 'name1',
				surname: 'surname1'
			},
			{
				name: 'name1',
				surname: 'surname1'
			},
		]
    });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
