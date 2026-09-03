import { getUserByIdHandler, createUserHandler } from '../handlers/users.mjs';
import { mockUsers } from '../utils/constants.mjs';
import * as helpers from '../utils/helpers.mjs';
import * as validator from 'express-validator';
import { User } from '../mongoose/schemas/user.mjs';

//mock the express-validator module to return a mock validation result and matched data
jest.mock('express-validator', () => ({
    //mock the validationResult function to return a mock validation result with isEmpty and array methods
    validationResult: jest.fn(() => ({
        //mock the isEmpty method to return false to simulate validation errors
        isEmpty: jest.fn(() => false),
        //mock the array method to return an array with a mock error message
        array: jest.fn(() => [{ msg: 'Invalid Field' }])
    })),
    //mock the matchedData function to return a mock data object with username, password, and displayName properties
    matchedData: jest.fn(() => ({
        username: "test",
        password: "password",
        displayName: "test_name"
    }))
}));

jest.mock('../utils/helpers.mjs', () => ({
    hashPassword: jest.fn(password => `hashed_${password}`)
}));

jest.mock('../mongoose/schemas/user.mjs');

//find user by id
const mockRequest =  {
    findUserIndex: 1,
};

//mock response object with sendStatus, send, and status methods
const mockResponse = {
    sendStatus: jest.fn(),
    send: jest.fn(),
    status: jest.fn(() => mockResponse)
}

//test suite for getUserByIdHandler and createUserHandler
describe('get users', () => {
    //test case for getUserByIdHandler
    it('should get user by id', () => {
        //call getUserByIdHandler with mockRequest and mockResponse
        getUserByIdHandler(mockRequest, mockResponse);
        //expect send to have been called with the user 
        expect(mockResponse.send).toHaveBeenCalled();
        //expect send to have been called with the user at index 1 in mockUsers
        expect(mockResponse.send).toHaveBeenCalledWith(mockUsers[1]);
        //expect send to have been called once
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
    });

    //test case for getUserByIdHandler when user is not found
    it('should call sendStatus with 404 when user not found', () => {
        //create a copy of mockRequest with findUserIndex set to 100
        const copyMockRequest = { ...mockRequest, findUserIndex: 100 };
        //call getUserByIdHandler with copyMockRequest and mockResponse
        getUserByIdHandler(copyMockRequest, mockResponse);
        //expect sendStatus to have been called
        expect(mockResponse.sendStatus).toHaveBeenCalled();
        //expect sendStatus to have been called with 404
        expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
        //expect sendStatus to have been called once
        expect(mockResponse.sendStatus).toHaveBeenCalledTimes(1);
        //expect send not to have been called
        expect(mockResponse.send).not.toHaveBeenCalled();
    });
});

//test suite for createUserHandler
describe('create user', () => {
    //variable to hold a mock request object with body property containing username, password, and displayName properties
    const mockRequest = {};

    //variable to hold a mock response object with sendStatus, send, and status methods
    it('should return status of 400 when there are errors', async () => {
        //call createUserHandler with mockRequest and mockRespnose
        await createUserHandler(mockRequest, mockResponse);
        //mock the validationResult function to return a mock validation result with isEmpty and array methods
        expect(validator.validationResult).toHaveBeenCalledTimes(1);
        //mock the validationResult function to have been called with mockRequest
        expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
        //check that the status method of mockResponse was called with 400
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        //check that the send method of mockResponse was called with an array containing an object with a msg property set to 'Invalid Field'
        expect(mockResponse.send).toHaveBeenCalledWith([{ msg: 'Invalid Field' }]);
    });

    //test case for createUserHandler when there are no validation errors and the user is created successfully
    it('should return status of 201 and the user created', async () => {
        //mock the validationResult function to return a mock validation result with isEmpty method returning true
        jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
            isEmpty: jest.fn(() => true)
        }));

        //mock the matchedData function to return a mock data object with username, password, and displayName properties
        const saveMethod = jest.spyOn(User.prototype, 'save').mockResolvedValueOnce({
            id: 1,
            username: 'test',
            password: 'hashed_password',
            displayName: 'test_name'
        });

        //call createUserHandler with mockRequest and mockResponse
        await createUserHandler(mockRequest, mockResponse);
        //mock the matchedData function to have been called with mockRequest
        expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);
        //mock the hashPassword function to have been called with 'password'
        expect(helpers.hashPassword).toHaveBeenCalledWith('password');
        //mock the hashPassword function to have returned 'hashed_password'
        expect(helpers.hashPassword).toHaveReturnedWith('hashed_password');
        //mock the User constructor to have been called with an object containing username, password, and displayName properties
        expect(User).toHaveBeenCalledWith({
            username: 'test',
            password: 'hashed_password',
            displayName: 'test_name'
        });

        //mock the save method of the User instance to have been called
        expect(saveMethod).toHaveBeenCalled();
        //mock the status method of mockResponse to have been called with 201
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        //mock the send method of mockResponse to have been called with an object containing id, username, password, and displayName properties
        expect(mockResponse.send).toHaveBeenCalledWith({
            id: 1,
            username: 'test',
            password: 'hashed_password',
            displayName: 'test_name'
        });
    });
   
    //test case for createUserHandler when there are no validation errors but the database fails to save the user
    it('send status of 400 when database fails to save user', async () => {
        //mock the validationResult function to return a mock validation result with isEmpty method returning true
        jest.spyOn(validator, 'validationResult').mockImplementationOnce(() => ({
            isEmpty: jest.fn(() => true)
        }));

        //mock the matchedData function to save the user data and return a mock data object with username, password, and displayName properties
        const saveMethod = jest.spyOn(User.prototype, 'save')
        .mockImplementationOnce(() => Promise.reject('Failed to save user'));

        //call createUserHandler with mockRequest and mockResponse
        await createUserHandler(mockRequest, mockResponse);
        //mock the matchedData function to have been called with mockRequest
        expect(saveMethod).toHaveBeenCalled();
        //mock the status method of mockResponse to have been called with 400
        expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
});