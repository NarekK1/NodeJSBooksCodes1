import express from 'express';

//create an instance of express
const app = express();

//create an array of products
const prods = [
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
	},
];

//create a route that takes an id as a parameter and returns the corresponding product from the array
app.get('/prod/:id', function(req, res){
    //get the product from the array using the id from the request parameters
    const prod = prods[req.params.id];
    //send the product name and cost as a response
    res.send(prod.name + ' ' + prod.cost);
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});