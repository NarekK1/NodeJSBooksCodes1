import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressHandlebars from 'express-handlebars';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create an instance of express application
const app = express();

//set the views directory for handlebars templates
app.set('views', path.join(__dirname, 'views'));

//create an instance of express-handlebars with default layout and file extension
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
//set the view engine to handlebars
app.set('view engine', 'hbs');

//define a route that renders a page based on the parameter passed in the URL 
app.get('/page/:page', (req, res) => {
    //variable to hold the page name passed in the URL parameter
    const pageName = req.params.page;

    //render the page with the name passed in the URL parameter
    res.render(pageName, (err, html) => {
        //if there is an error rendering the page, send a 404 response with the 404 template
        if(err){
            //render the 404 page using the main layout
            res.status(404).render('404');
        }
        //if the page is rendered successfully, send the HTML response
        else{
            //send the rendered HTML response
            res.send(html);
        }
    })
});

//define a route that handles all other requests and renders a 404 page
app.use((req, res) => {
    //render the 404 page using the main layout
    res.render('404');
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})





