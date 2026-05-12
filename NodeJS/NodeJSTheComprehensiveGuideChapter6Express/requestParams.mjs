//importing express module
import express from "express";
//creating express app
const app = express();
//defining port number
const PORT = 8080;

//definiing a route handler for the default home page
app.get('/', function(req, res){
    //extracting userId from the route parameters
    const userId = req.params.userId;
    //printing userId on console
    console.log(userId);
    //sending response and printing message
    console.log(req.params.name);
    //sending response and printing params name whic is undefined
    res.send(`Paramas name is ${req.params.name}`);
});
//starting the server at port 8080 and printing message
app.listen(8080, () => console.log(`Movie database accessible at http://localhost:8080`));