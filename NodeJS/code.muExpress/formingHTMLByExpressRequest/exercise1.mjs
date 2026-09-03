import express from 'express';

//create an instance of the express application
const app = express();

//array of users to be sent as a response
const users = ['user1', 'user2', 'user3', 'user4', 'user5'];

//define a route that responds with an HTML page containing the user elements
app.get(`/users`, (req, res) => {
    //create an ordered list from the user elements
    let result = '<ol>';

    //iterate over the users array and create list items for each user
    for(const user of users){
        //append each user as a list item to the result string
        result += '<li>' + user + '</li>';
    }

    //close the ordered list tag
    result += '</ol>';
    //send the resulting HTML string as a response
    res.send(result);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})