import express from 'express';

//create an instance of the express application
const app = express();

//array of products to be sent as a response
const products = [
    {
		name: 'prod1',
		cost: 1000,
	},
	{
		name: 'prod2',
		cost: 2000,
	},
	{
		name: 'prod3',
		cost: 3000,
	}
];

//route to handle GET requests to '/prods' and send an HTML response with the product list
app.get('/prods', function(req, res){
    //create an HTML unordered list of products
    let result = '<ul>';

    //iterate over the products array and create a list item for each product
    for(const prod of products){
        //append the product name and cost to the result string as a list item
        result += '<li>' + prod.name + ' ' + prod.cost + '</li>';
    }

    //close the unordered list tag
    result += '</ul>';

    //send the HTML response to the client
    res.send(result);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});