//send given array of users to send to browser
import express from 'express';

//create an instance of express
const app = express();

//create an array of users
const users = ['user1', 'user2', 'user3', 'user4', 'user5'];

//create a route that takes a number as a parameter and returns the corresponding user from the array
app.get('/users/:users', (req, res) => {
    //get the number from the request parameters
    res.send(users[req.params.users]);
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});