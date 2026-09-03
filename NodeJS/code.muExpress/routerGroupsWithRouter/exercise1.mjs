import express from 'express';

//create an express application
const app = express();
//create a router for city-related routes
const cityRouter = express.Router();
//create a router for country-related routes
const countryRouter = express.Router();

//define routes for the cityRouter
cityRouter.get('/show/:id', (req, res) => {
    //send a response with the city ID from the request parameters
    res.send(`City ID: ${req.params.id}`);
});

//define another route for editing a city
cityRouter.get('/edit/:id', (req, res) =>  {
    //send a response indicating the city ID to be edited
    res.send(`Edit City ID: ${req.params.id}`);
});

//define routes for the countryRouter
countryRouter.get('/list', (req, res) => {
    //send a response with a list of countries
    res.send('List of countries');
});

//define another route for showing a specific country
countryRouter.get('/show/:id', (req, res) => {
    //send a response with the country ID from the request parameters
    res.send(`Country ID: ${req.params.id}`);
});

//define another route for editing a country
countryRouter.get('/edit/:id', (req, res) => {
    //send a response indicating the country ID to be edited
    res.send(`Edit Country ID: ${req.params.id}`);
});

//mount the cityRouter on the '/city/' path
app.use('/city/', cityRouter);
//mount the countryRouter on the '/country/' path
app.use('/country/', countryRouter);

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});