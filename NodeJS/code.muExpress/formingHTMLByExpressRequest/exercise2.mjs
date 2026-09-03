import express from 'express';

//create an instance of the express application
const app = express();

//array of users to be sent as a response
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

//route to handle GET requests to '/users' and send an HTML response with the user list
app.get('/users', (req, res) => {
    //create an HTML ordered list of users
    let result = '<ol>';

    //iterate over the users array and create a list item for each user
    for(const user of users){
        //append the user name and age to the result string as a list item
        result += '<li>' + user.name + ' ' + user.age + '</li>';
    }

    //close the ordered list tag
    result += '</ol>';

    //send the HTML response to the client
    res.send(result);
})

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});