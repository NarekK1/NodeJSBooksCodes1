//create a route that returns one user and a route that return characteristics of a user
import express from 'express';

//create an instance of express
const app = express();

//create an array of users
const users = [
	{
		name: 'user1',
		age:  31,
	},
	{
		name: 'user2',
		age:  32,
	},
	{
		name: 'user3',
		age:  33,
	},
];

//create a route that takes an id as a parameter and returns the corresponding user from the array
app.get('/users/:id', (req, res) => {
    //get the user from the array using the id from the request parameters
    const user = users[req.params.id];
    //send the user name and age as a response
    res.send(user.name + ' ' + user.age); 
});

//create a route that takes an id and a name as parameters and returns the corresponding characteristic of the user from the array
app.get('/users/:id/:name', (req, res) => {
    //get the user from the array using the id from the request parameters
    const user = users[req.params.id];
    //send the user characteristic as a response
    res.send(user[req.params.name]);
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});