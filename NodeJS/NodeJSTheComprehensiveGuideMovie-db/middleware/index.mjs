import express from "express";
import morgan from "morgan";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as movieRouter } from "../movie/index.mjs";
//create an express app
const app = express();
//define a port number or use environment port
const PORT = process.env.PORT || 8080;
//setup morgan for logging
const accessLogStream = createWriteStream('access.log', {flags : 'a'});
//configure morgan middleware
app.use(morgan('common', {
    //log requests immediately 
    immediate: true,
    //write logs to access log file
    stream: accessLogStream

}));
//use the movie router for routes starting with /movie
app.use('/movie', movieRouter);
//define a route for the root path to redirect to /movie
app.get('/', (request, response) => response.redirect('/movie'));
//start a server and listen to the port
app.listen(PORT, function(){
    console.log(`Server is listening to port ${PORT}`);
});