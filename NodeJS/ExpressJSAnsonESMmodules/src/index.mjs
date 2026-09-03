// import express from 'express';
// import { query, validationResult, body, matchedData, checkSchema } from 'express-validator';
// import { createUserValidationSchema } from './utils/validationSchemas.mjs';
// import usersRouter from './routes/users.mjs';
// import { mockUsers } from './utils/constants.mjs';
// import { resolveIndexByUserId } from './utils/middlewares.mjs';
// import productsRouter from './routes/products.mjs';
// import routes from './routes/index.mjs';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import { mockUsers } from './utils/constants.mjs';
// import passport from 'passport';
import mongoose from 'mongoose';
import { createApp } from './createApp.mjs';
// import MongoStore from 'connect-mongo'; 
import './strategies/local-strategy.mjs';
// import './strategies/discord-strategy.mjs';


//create an instance of express
// const app = express();

//connect to the MongoDB database using mongoose and log a message to the console when connected or if there is an error
mongoose.connect('mongodb+srv://nkirakosyan56_db_user:IIWWUFJJrSa2r1bY@cluster0.rfxuf4m.mongodb.net/?appName=Cluster0')
.then(() => console.log('Connected to database'))
.catch(err => console.log(`Error: ${err}`));

//create an instance of the express app using the createApp function from the createApp.mjs file
const app = createApp();


//use the express.json() middleware to parse incoming JSON requests
// app.use(express.json());

//use the cookie-parser middleware to parse cookies from the request headers
// app.use(cookieParser('helloworld'));

//use the express-session middleware to manage sessions with a secret, and set the cookie max age to 1 hour
// app.use(session(
//     {
//     secret: "anson the dev",
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: 60000 * 60
//     },
//     store: MongoStore.create({
//         client: mongoose.connection.getClient()
//     })

//     }
// ));

//use the passport.initialize() middleware to initialize passport for authentication
// app.use(passport.initialize());
//use the passport.session() middleware to manage user sessions with passport
// app.use(passport.session());

//use the routes from the index.mjs file for all routes
// app.use(routes);


//use the productsRouter for all routes starting with /api/products
// app.use(productsRouter);

//use the usersRouter for all routes starting with /users
// app.use(usersRouter);

//use the express.urlencoded() middleware to parse incoming URL-encoded requests
// const loggingMiddleware = (request, response, next) => {
    //log the request method and url to the console
    // console.log(`${request.method} - ${request.url}`);
    //call the next middleware function in the stack
    // next();
// }

//use middleware function to log the request method and url to the console for every incoming request
// app.use(loggingMiddleware);

//middleware function to resolve the index of a user by their id from the request params
// const resolveIndexByUserId = (request, response, next) => {
    //variable to hold the id from the request params
    // const { body, params: { id } } = request;

    //parse the id from the request params and convert it to an integer
    // const parsedId = parseInt(id);

    //check if the parsed id is a number and send a 400 Bad Request error response if it is not
    // if(isNaN(parsedId)){
        //send a 400 Bad Request error response to the client
        // return response.sendStatus(400);
    // }

    //find the index of the user with the specified id in the mockUsers array
    // const findUserIndex = mockUsers.findIndex(user => user.id === parsedId);

    //check if the user with the specified id was found and send a 404 Not Found error response if it was not
    // if(findUserIndex === -1){
        //send a 404 Not Found error response to the client
        // return response.sendStatus(404);
    // }

    //attach the findUserIndex to the request object for use in subsequent middleware or route handlers
    // request.findUserIndex = findUserIndex;

    //call the next middleware function in the stack
    //  next();
// }

//set the port to listen on
const PORT = process.env.PORT || 3000;

//define a route for the /api/auth path that authenticates a user with a username and password using passport's local strategy
// app.post('/api/auth', passport.authenticate('local'), (request, response) => {
//     //send a 200 OK status code response to the client if the authentication is successful
//     response.sendStatus(200);
// });

//define a route for the /api/auth/status path that checks if the user is authenticated 
// app.get('/api/auth/status', (request, response) => {
    //log a message to the console indicating that the /auth/status endpoint has been hit
    // console.log(`Inside /auth/status endpoint`);
    //log the user object and session object to the console
    // console.log(request.user);
    //log the session object to the console
    // console.log(request.session);
    //log the session id to the console
    // console.log(request.sessionID);

    //check if the user is authenticated and send a response with the user object if they are, or a 401 Unauthorized error response if they are not
    // return request.user ? response.send(request.user) : response.sendStatus(401);
// });

//define a route for the /api/auth/logout path that logs out the user and sends a response with a 200 OK status code if successful
// app.post('/api/auth/logout', (request, response) => {
    //check if the user is authenticated and send a 401 Unauthorized error response if they are not
    // if(!request.user){
        //send a 401 Unauthorized error response to the client
        // return response.sendStatus(401);
    // }

    //log out the user using the request.logout() method and send a response with a 200 OK status code if successful
    // request.logout(err => {
        //handle any errors that occur during the logout process and send a 400 Bad Request error response if there is an error
        // if(err){
            //send a 400 Bad Request error response to the client
            // return response.sendStatus(400);
        // }

        //send a 200 OK status code response to the client if the logout is successful
        // response.sendStatus(200);
    // });
// });

//define a route for the root path that sends a "Hello World" message as a response and sets a cookie with a max age of 1 hour
// app.get('/', (request, response) => {
    //log the session object to the console
    // console.log(request.session);
    //log the session id to the console
    // console.log(request.session.id);
    //set a session variable to indicate that the user has visited the site and not to change the session id on every request
    // request.session.visited = true;
    //set a cookie with the name "hello" and value "world" that expires in 30 seconds and is signed
    // response.cookie('hello', 'world', { maxAge: 30000, signed: true });
    //send a response to the client
    // response.status(201).send({ msg: 'Hello' });
// });

//define a route for the /api/auth path that authenticates a user with a username and password and sends a response with the user object if successful
// app.post('/api/auth', (request, response) => {
    //variable to hold the request body with username and password
    // const { body: { username, password } } = request;

    //find the user with the specified username in the mockUsers array
    // const findUser = mockUsers.find(user => user.username === username);

    //check if the user was found and if the password matches, send a 401 Unauthorized error response if it does not
    // if(!findUser || findUser.password !== password){
        //send a 401 Unauthorized error response to the client
        // return response.status(401).send({ msg: "BAD CREDENTIALS" });
    // }

    //set the user object in the session to indicate that the user is logged in
    // request.session.user = findUser;
    //send a response to the client with the user object and a 200 OK status code
    // return response.status(200).send(findUser);
// });

//define a route for the /api/auth/status path that checks if the user is authenticated and sends a response with the user object if they are
// app.get('/api/auth/status', (request, response) => {
    //get the session from the session store using the session id from the request
    // request.sessionStore.get(request.sessionID, (err, session) => {
        //log the session object to the console
        // console.log(session)
    // })

    //check if the user object is set in the session and send a response with the user object if it is
    // if(request.session.user){
        //send a response to the client with the user object and a 200 OK status code
        // return response.status(200).send(request.session.user);
    // }
    //check if the user object is not set in the session and send a 401 Unauthorized error response if it is not
    // else{
        //send a 401 Unauthorized error response to the client
        // return response.status(401).send({ msg: "Not Authenticated" });
    // }
// });

//define a route for the /api/cart path that adds an item to the user's cart and sends a response with the item if the user is authenticated
// app.post('/api/cart', (request, response) => {
    //check if the user object is set in the session and send a 401 Unauthorized error response if it is not
    // if(!request.session.user){
        //send a 401 Unauthorized error response to the client
        // return response.sendStatus(401);
    // }

    //variable to hold the request body with the item and the cart from the session
    // const { body: item } = request;
    //variable to hold the cart from the session
    // const { cart } = request.session;
    
    //check if the cart is set in the session and add the item to the cart if it is, or create a new cart with the item if it is not
    // if(cart){
        //add the item to the cart array in the session
        // cart.push(item);
    // }
    //check if the cart is not set in the session and create a new cart with the item if it is not
    // else{
        //create a new cart array in the session with the item
        // request.session.cart = [item];
    // }

    //send a response to the client with the item and a 201 Created status code
    // return response.status(201).send(item);
// });

//define a route for the /api/cart path that sends the user's cart as a response if they are authenticated  
// app.get('/api/cart', (request, response) => {
    //check if the user object is set in the session and send a 401 Unauthorized error response if it is not
    // if(!request.session.user){
        //send a 401 Unauthorized error response to the client
        // return response.sendStatus(401);
    // }

    //send a response to the client with the cart array from the session or an empty array if the cart is not set in the session
    // return response.send(request.session.cart ?? []);
// })

//define a route for the /users/api path that sends a list of users as a response with optional query parameters for filtering that checks if parameters is string, not empty 
//and with length from 3 to 10
// app.get('/api/users', 
//     query('filter')
//     .isString()
//     .notEmpty()
//     .withMessage("Must not be empty")
//     .isLength({ min: 3, max: 10 })
//     .withMessage("Must be at least 3-10 characters")
// ,(request, response) => {
//     //variable query with filter and value for request
//     const { query: { filter, value } } = request;

//     const result = validationResult(request);
//     console.log(result);

//     //when filter and value are undefined, send a response with the list of users
//     if(!filter && !value){
//         //send a response to the client with a list of users
//         response.send(mockUsers);
//     }

//     //when filter and value are defined, send a response with the list of users that match the filter and value
//     else if(filter && value){
//         //send a response to the client with a list of users that match the filter and value
//         return response.send(mockUsers.filter(user => user[filter].includes(value)));
//     }

//     //when filter is defined and value is undefined, send a response with the list of users that match the filter
//     return response.send(mockUsers);
// });

//define a route for the /api/users path that creates a new user and sends the updated list of users as a response
// app.post('/api/users',
    // [
    // body("username")
    // .notEmpty()
    // .withMessage('Cannot be empty')
    // .isLength({ min: 5, max: 32 })
    // .withMessage('Must be at least 5 characters with a max of 32 characters')
    // .isString()
    // .withMessage('Must be a string!'), 
    // body("displayName").notEmpty()],
    // checkSchema(createUserValidationSchema),
    // (request, response) => {
    //variable to hold the result of the validation
    // const result = validationResult(request);
    //log the result of the validation to the console
    // console.log(result);
    
    //check if the result of the validation is not empty and send a 400 Bad Request error response with the validation errors if it is not
    // if(!result.isEmpty()){
        //send a 400 Bad Request error response to the client with the validation errors
        // return response.status(400).send({ errors: result.array() });
    // }

    //variable to hold the matched data from the request
    // const data = matchedData(request);

    //variable to hold the request body 
    //create a new user object with an id and the request body
    // const newUser =  { id: mockUsers[mockUsers.length - 1].id + 1, ...data };

    //push the new user object to the mockUsers array
    // mockUsers.push(newUser);

    //send a response to the client with the updated list of users and a 201 Created status code
    // return response.status(201).send(mockUsers);
// });

//define a route for the /api/products path that sends a list of products as a response
// app.get('/api/products', (request, response) => {
    //send a response to the client with a list of products
    // response.send([{ id: 123, name: 'chicken breast', price: 12.99 }]);
// });

//define a route for the /api/users/:id path that updates a user with the specified id and sends a response with the updated user
// app.put('/api/users/:id', resolveIndexByUserId,(request, response) => {
    //variable to hold the request body  and the  findUserIndex from middleware for request params
    // const { body, findUserIndex } = request;

 
    //update the user with the specified id in the mockUsers array with the request body and send a 200 OK status code response
    // mockUsers[findUserIndex] = { id: parsedId, ...body };
    // mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
    //send a 200 OK status code response to the client
    // return response.sendStatus(200);
// });

//define a route for the /api/users/:id path that updates partially a user with the specified id and sends a response with the updated user
// app.patch('/api/users/:id', resolveIndexByUserId, (request, response) => {
    //variable to hold the request body  and the  findUserIndex from middleware for request params
    // const { body, findUserIndex } = request;

    //update the user with the specified id in the mockUsers array with the request body
    // mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

    //send a 200 OK status code response to the client
    // return response.sendStatus(200);
// });

//define a route for the /api/users/:id path that sends a user with the specified id as a response
// app.get('/api/users/:id', (request, response) => {
    //variable to hold function for request
    // const { findUserIndex } = request;

    //finds the user using mockUsers array and findUserIndex function
    // const findUser = mockUsers[findUserIndex];
     
    //send a response with the user if it is not found 404 Not Found error if it is not
    //  if(!findUser){
        //send a 404 Not Found error response to the client
        // return response.sendStatus(404);
    // }

    //send a response with th
    // return response.send(findUser);
// });

//define a route for the /api/users/:id path that deletes a user with the specified id and sends a response with the updated list of users
// app.delete('/api/users/:id', resolveIndexByUserId, (request, response) => {
    //variable to hold the id from the request params
    // const { findUserIndex } = request;

    //delete the user with the specified id from the mockUsers array and send
    // mockUsers.splice(findUserIndex, 1);

    //send a 200 OK status code response to the client
    // return response.sendStatus(200);
// });

//define a route for the /api/auth/discord path that authenticates a user with Discord using passport's Discord strategy
// app.get('/api/auth/discord', passport.authenticate('discord'));
//define a route for the /api/auth/discord/redirect path that handles the redirect from Discord after authentication and sends a response with a 200 OK status code
// app.get('/api/auth/discord/redirect', passport.authenticate('discord'), (request, response) => {
    //log the session object and user object to the console
    // console.log(request.session);
    // console.log(request.user);
    //send a 200 OK status code response to the client
    // response.sendStatus(200);
// });

//listen for port and log a message to the console when the server is running
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});

