//importing express module
import express from "express";
//creating express app
const app = express();
//defining port number
const PORT = 8080;

//definiing a route handler for the default home page
app.get('/', function(req, res){
    //setting Content-Type header
    res.set('Content-Type', 'text/plain');
    //printing Content-Type header on console when visitng the website
    console.log(res.get('Content-Type'));
    //sending response and printing Content-Type header at the site when visitng the router /
    res.send(`Content-Type set to: ${res.get('Content-Type')}`);
});
//starting the server at port 8080 and printing message
app.listen(8080, () => console.log(`Movie database accessible at http://localhost:8080`));