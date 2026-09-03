//send 404 error if user tries to access a route that doesn't exist from code of exercise1.mjs
import express from 'express';

//create an instance of express
const app = express();


//create an array of users
const users = ['user1', 'user2', 'user3', 'user4', 'user5'];

//create a route that takes a number as a parameter and returns the corresponding user from the array if the number is valid, otherwise send a 404 error
app.get('/users/:users', (req, res) => {
    //get the number from the request parameters
    const index = Number(req.params.users);

    //check if the index is valid
    if(index >= 0 && index < users.length){
        //get the number from the request parameters
        res.send(users[req.params.users]);
    }
    //if the index is not valid, send a 404 error
    else{
        //set the status code to 404 and send a message
        res.status(404).send('404 Not Found');
    }

});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

