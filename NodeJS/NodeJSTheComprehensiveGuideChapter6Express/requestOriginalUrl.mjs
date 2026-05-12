//importing express module
import express from "express";
//creating express app
const app = express();
//defining port number
const PORT = 8080;
//definiing a route handler for the default home page
app.get('/', function(req, res){
    //printing original url on console
    console.log("OriginalUrl", req.originalUrl);
     //sending response and printing message of route address
    res.send(`original URL route ${req.originalUrl}`);
});
//starting the server at port 8080 and printing message
app.listen(PORT, function(err){
    //handling error
    if(err){
        //printing error message
        console.log(err);
    }
    //printing success message and server port and url which is running
    console.log(`Server is running on http://localhost:${PORT}`);

});