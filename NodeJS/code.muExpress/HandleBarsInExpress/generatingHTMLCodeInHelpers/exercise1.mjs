//create a helper to generate image tag and output few images in the page.hbs file

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

//create an instance of express-handlebars with default layout, file extension and a helper function to generate an image tag with the given URL and alt text
const handlebars = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        image: function(src, alt){
            return '<img src="' + src + '" alt="' + alt + '">';
        }
    }
});

//set the view engine to handlebars
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//define a route to render the page.hbs template
app.get('/page', (req, res) => {
    //render the page.hbs template
    res.render('page');
});

//define a single route to serve all images from the images directory
app.get('/page/image/:name', (req, res) => {
    //get the image name from the request parameters
    const imagePath = path.join(__dirname, 'images', req.params.name);

    //send the image file located in the images directory
    res.sendFile(imagePath, (err) => {
        //if there is an error sending the file, send a 404 response
        if (err) {
            //send a 404 response if the image is not found
            res.status(404).send('Image not found');
        }
    });
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});