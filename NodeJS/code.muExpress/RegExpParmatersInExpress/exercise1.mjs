import express from 'express';

//create an instance of the express application
const app = express();

//route to handle GET requests to 'user/:name' and send a response indicating that the user route was accessed
app.get('/user/:name', (req, res) => {
    //send a response indicating that the user route was accessed
    res.send('User route accessed');
});

//route to handle GET requests to 'id/:id' and send a response indicating that the id route was accessed
app.get('/id/:id', (req, res) => {
    //if the id parameter is not a number, send a 400 Bad Request response
    if(!/^\d+$/.test(req.params.id)){
        //send a 400 Bad Request response with an error message
       return res.status(400).send('Invalid id parameter. It should be a number.');
    }
    //send a response indicating that the id route was accessed
    res.send(`User id: ${req.params.id}`);
});

//route to handle GET request '/login/:login', '/admin/:admin', and '/guest/:guest' and send a response indicating the user login, admin name, or guest name respectively
app.get('/login/:login', (req, res) => {
    res.send(`User login: ${req.params.login}`);
});

app.get('/admin/:admin', (req, res) => {
    res.send(`User name: ${req.params.admin}`);
});


app.get('/guest/:guest', (req, res) => {
    res.send(`User name: ${req.params.guest}`);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

