
import { Router } from 'express';
import { query, validationResult, checkSchema, matchedData } from 'express-validator';
import { mockUsers } from '../utils/constants.mjs';
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';
import { resolveIndexByUserId } from '../utils/middlewares.mjs';
import { User } from '../mongoose/schemas/user.mjs';
import { hashPassword } from '../utils/helpers.mjs';
import { getUserByIdHandler, createUserHandler } from '../handlers/users.mjs'; 

//create a new router instance
const router = Router();

//define a route for the /users/api path that sends a list of users as a response with optional query parameters for filtering that checks if parameters is string, not empty 
//and with length from 3 to 10
router.get('/api/users', 
    query('filter')
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3-10 characters")
,(request, response) => {
    //log the session object to the console
    // console.log(request.session);
    //log the session id to the console
    console.log(request.session.id);

    //get the session data from the session store using the session id and log it to the console
    request.sessionStore.get(request.session.id, (err, sessionData) => {
        //check if there is an error and log it to the console and throw it if there is
        if(err){
            //log the error to the console and throw it
            console.log(err);
            //throw the error
            throw err;
        }
        //log the session object to the console
        console.log(sessionData);

    });
    //variable query with filter and value for request
    const { query: { filter, value } } = request;

    //variable to hold the result of the validation
    const result = validationResult(request);
    //log the result of the validation to the console
    console.log(result);

    if(!result.isEmpty()){
        return response.status(400).send(result.array());
    }

    //when filter and value are undefined, send a response with the list of users
    if(!filter && !value){
        //send a response to the client with a list of users
        return response.send(mockUsers);
    }

    //when filter and value are defined, send a response with the list of users that match the filter and value
    else if(filter && value){
        //send a response to the client with a list of users that match the filter and value
        return response.send(mockUsers.filter(user => user[filter].includes(value)));
    }

    //when filter is defined and value is undefined, send a response with the list of users that match the filter
    return response.send(mockUsers);
});

//define a route for the /api/users/:id path that sends a user with the specified id as a response
router.get('/api/users/:id', resolveIndexByUserId, getUserByIdHandler);

//define a route for the /api/users path that creates a new user and sends the updated list of users as a response
router.post('/api/users',
    // [
    // body("username")
    // .notEmpty()
    // .withMessage('Cannot be empty')
    // .isLength({ min: 5, max: 32 })
    // .withMessage('Must be at least 5 characters with a max of 32 characters')
    // .isString()
    // .withMessage('Must be a string!'), 
    // body("displayName").notEmpty()],
    checkSchema(createUserValidationSchema),
    createUserHandler
    // async (request, response) => {
    //variable to hold the result of the validation
    // const result = validationResult(request);

    //send a response with the validation errors if the result of the validation is not empty
    // if(!result.isEmpty()){
        //send result of the validation errors to the client with as array and a 400 Bad Request error response
        // return response.status(400).send(result.array());
    // }

    //variable to hold the matched data from the request
    // const data = matchedData(request);

    //log the matched data to the console
    // console.log(data);

    //hash the password before saving it to the database
    // data.password = hashPassword(data.password);


    //variable to hold the request body
    // const { body } = request;
    //create a new user object with the request body
    // const newUser = new User(data);

    //save the new user object to the database and send a response with the saved user
    // try{
        //save the new user object to the database and send a response with the saved user
        // const savedUser = await newUser.save();
        //send a response to the client with the saved user and a 201 Created status code
        // return response.status(201).send(savedUser);
    // }
    //catch any errors that occur during the save operation and send a 400 Bad Request error response to the client
    // catch(err){
        //log the error to the console and send a 400 Bad Request error response to the client
        // console.log(err);
        //send a 400 Bad Request error response to the client
        // return response.status(400).send({ msg: 'Unable to create user' });
    // }

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
);

//define a route for the /api/users/:id path that updates a user with the specified id and sends a response with the updated user
router.put('/api/users/:id', resolveIndexByUserId,(request, response) => {
    //variable to hold the request body  and the  findUserIndex from middleware for request params
    const { body, findUserIndex } = request;

 
    //update the user with the specified id in the mockUsers array with the request body and send a 200 OK status code response
    // mockUsers[findUserIndex] = { id: parsedId, ...body };
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
    //send a 200 OK status code response to the client
    return response.sendStatus(200);
});

//define a route for the /api/users/:id path that updates partially a user with the specified id and sends a response with the updated user
router.patch('/api/users/:id', resolveIndexByUserId, (request, response) => {
    //variable to hold the request body  and the  findUserIndex from middleware for request params
    const { body, findUserIndex } = request;

    //update the user with the specified id in the mockUsers array with the request body
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

    //send a 200 OK status code response to the client
    return response.sendStatus(200);
});


//define a route for the /api/users/:id path that deletes a user with the specified id and sends a response with the updated list of users
router.delete('/api/users/:id', resolveIndexByUserId, (request, response) => {
    //variable to hold the id from the request params
    const { findUserIndex } = request;

    //delete the user with the specified id from the mockUsers array and send
    mockUsers.splice(findUserIndex, 1);

    //send a 200 OK status code response to the client
    return response.sendStatus(200);
})

//export the router to be used in other parts of the application
export default router;