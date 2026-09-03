import { mockUsers } from '../utils/constants.mjs';
import { matchedData, validationResult } from 'express-validator';
import { hashPassword } from '../utils/helpers.mjs';
import { User } from '../mongoose/schemas/user.mjs';

//define a route for the /api/users/:id path that sends a user with the specified id as a response
export const getUserByIdHandler = (request, response) => {
    //variable to hold function for request
    const { findUserIndex } = request;

    //finds the user using mockUsers array and findUserIndex function
    const findUser = mockUsers[findUserIndex];
     
    //send a response with the user if it is not found 404 Not Found error if it is not
     if(!findUser){
        //send a 404 Not Found error response to the client
        return response.sendStatus(404);
    }

    //send a response with th
    return response.send(findUser);
};

//define a route for the /api/users path that creates a new user and sends a response with the created user
export const createUserHandler =  async (request, response) => {
    //variable to hold the result of the validation
    const result = validationResult(request);

    //send a response with the validation errors if the result of the validation is not empty
    if(!result.isEmpty()){
        //send result of the validation errors to the client with as array and a 400 Bad Request error response
        return response.status(400).send(result.array());
    }

    //variable to hold the matched data from the request
    const data = matchedData(request);

    //log the matched data to the console
    console.log(data);

    //hash the password before saving it to the database
    data.password = hashPassword(data.password);


    //variable to hold the request body
    // const { body } = request;
    //create a new user object with the request body
    const newUser = new User(data);

    //save the new user object to the database and send a response with the saved user
    try{
        //save the new user object to the database and send a response with the saved user
        const savedUser = await newUser.save();
        //send a response to the client with the saved user and a 201 Created status code
        return response.status(201).send(savedUser);
    }
    //catch any errors that occur during the save operation and send a 400 Bad Request error response to the client
    catch(err){
        //log the error to the console and send a 400 Bad Request error response to the client
        console.log(err);
        //send a 400 Bad Request error response to the client
        return response.status(400).send({ msg: 'Unable to create user' });
    }
};