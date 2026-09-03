import request from 'supertest';
import mongoose from 'mongoose'
import { createApp } from '../createApp.mjs';

//test suite for creating a user and logging in
describe('create user and login', () => {
    //create an instance of the express app using the createApp function from the createApp.mjs file
    let app;

    //before all tests, connect to the MongoDB database using mongoose and log a message to the console when connected or if there is an error
    beforeAll(async () => {
        //connect to the MongoDB database using mongoose and log a message to the console when connected or if there is an error
        await mongoose.connect('mongodb+srv://nkirakosyan56_db_user:IIWWUFJJrSa2r1bY@cluster0.rfxuf4m.mongodb.net/?appName=Cluster0')
        .then(() => console.log("Connected to Test Database"))
        .catch((err) => console.log(`Error: ${err}`));;
        console.log('Connected to database');

        app = createApp();

});
   //test case for creating a user that expects a status of 201 when the user is created successfully
   it('should create the user', async () => {
    //send a POST request to the /api/users endpoint with the user data and store the response in a variable
    const response = await request(app).post('/api/users').send({
        username: 'adam123',
        password: 'password',
        displayName: 'Adam The Developer'
    });
    //expect the response status code to be 201
    expect(response.status).toBe(201);
});  
    //test case for logging in a user that expects a status of 200 when the user is logged in successfully
    it('should log the user in and visist /api/auth/status and return auth uer', async () => {
        //send a POST request to the /api/auth endpoint with the user credentials, store the response in a variable
        //then send a GET request to the /api/auth/status endpoint with the cookie from the previous response and store the response in a variable
        const response = await request(app).post('/api/auth')
        .send({ username: 'adam123', password: 'password' })
        .then((res) => request(app).get('/api/auth/status').set('Cookie', res.headers['set-cookie']));

        //expect the response status code to be 200
        expect(response.status).toBe(200);
        //expect the response body to have the correct username and displayName
        expect(response.body.username).toBe('adam123');
        expect(response.body.displayName).toBe('Adam The Developer');
        // expect(response.body).not.toHaveProperty('password');
    })
    //after all tests, drop the test database and close the mongoose connection
    afterAll(async () => {
        //drop the test database
        await mongoose.connection.dropDatabase();
        //close the mongoose connection
        await mongoose.connection.close();
    })
});