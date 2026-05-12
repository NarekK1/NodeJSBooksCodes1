import express from "express";
import morgan from "morgan";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as movieRouter } from "./movie/index.mjs";
import  { engine }  from "express-handlebars";

 // create an express app
const app = express();
//define a port number or use environment port
const PORT = process.env.PORT || 8080;
//set handlebars as the view engine
app.engine('handlebars', engine({ 
    defaultLayout: 'main',
    helpers:{
        uc: data => data.toUpperCase(),
    },
}),
);
app.set('view engine', 'handlebars');;

//set the views directory
app.set('views', [`${dirname(fileURLToPath(import.meta.url))}/movie/views`]);
//serve static files from the public directory
app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));
//configure morgan middleware
app.use(morgan('common', {
    //log requests immediately
    immediate: true,

}));
//middleware to parse urlencoded form data
app.use(express.urlencoded({extended: false}));
//use the movie router for routes starting with /movie
app.use('/movie', movieRouter);
//define a route for the root path to redirect to /movie
app.get('/', (request, response) => response.redirect('/movie'));
//start a server and listen to the port
app.listen(PORT, function(){
    console.log(`Server is listening to port ${PORT}`);
});