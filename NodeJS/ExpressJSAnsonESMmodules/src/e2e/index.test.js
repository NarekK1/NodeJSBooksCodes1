import request from 'supertest';
// import express from 'express';
import mongoose from 'mongoose'
import { createApp } from '../createApp.mjs';


//create an instance of express
// const app = express();



//define a route for the /hello path that sends a status of 201 as a response
// app.get('/hello', (req, res) => res.status(200).send({}));

//define a route for the /hello path that sends a status of 201 as a response
// describe('hello endpoint', () => {
    //test case for the /hello endpoint that expects a status of 200 and a response body of { msg: "invalid" }
    // it('get /hello and expect 200', async () => {
        // request(app).get('/hello').expect(200).end((err, res) => {
            // if(err){
                // throw err;
            // }
        // });
        //send a GET request to the /hello endpoint and store the response in a variable
        // const response = await request(app).get('/hello');

        //expect the response status code to be 200
        // expect(response.statusCode).toBe(200);
        //expect the response body to be { msg: "invalid" }
        // expect(response.body).toStrictEqual({ msg: "invalid" });
        // expect(response.body);
    // });
// });


//test suite for the /api/auth endpoint
describe('/api/auth', () => {
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

    //test case for the /api/auth/status endpoint that expects a status of 401 when not logged in
    it('should return 401 when not logged in', async () => {
        //send a GET request to the /api/auth/status endpoint and store the response in a variable
        const response = await request(app).get('/api/auth/status');
        //expect the response status code to be 401
        expect(response.status).toBe(401);
    });

    //after all tests, drop the test database and close the mongoose connection
    afterAll(async () => {
        //drop the test database
        await mongoose.connection.dropDatabase();
        //close the mongoose connection
        await mongoose.connection.close();
    });
});