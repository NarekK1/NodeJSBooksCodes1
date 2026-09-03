import express from 'express';

//create an instance of the express application
const app = express();

//array to be sent as a response
const arr = ['a', 'b', 'c'];

//define a route that responds with an HTML page containing the array elements
app.get('/test', function(req, res){
    //create an unordered list from the array elements
    let result = '<ul>';

    //iterate over the array and create list items for each element
    for(const elem of arr){
        //append each element as a list item to the result string
        result += '<li>' + elem + '</li>';
    }
    
    //close the unordered list tag
    result += '</ul>';
    //send the resulting HTML string as a response
    res.send(result);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});