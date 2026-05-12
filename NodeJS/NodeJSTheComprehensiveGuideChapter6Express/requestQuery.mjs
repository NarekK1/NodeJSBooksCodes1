//importing express module
import express from "express";
//creating express app
const app = express();
//defining port number
const PORT = 8080;

//definiing a route handler for the default home page
app.get('/', function(req, res){
    //getting route term from query string
   const routeTerm = req.query.q;
   //printing route term on console
   console.log(`Route term: ${routeTerm}`);
   //sending response and printinig route term
    res.send(`Route term: ${routeTerm}`);
});
//starting the server at port 8080 and printing message
app.listen(8080, () => console.log(`Movie database accessible at http://localhost:8080`));