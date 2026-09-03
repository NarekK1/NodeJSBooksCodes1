import * as chai from 'chai';
//expect is an assertion style provided by Chai
const expect =  chai.expect;
import app from '../../installExpressAndNodeJS/app.mjs';
import request from 'supertest';

//describe block for the GET / route
describe('GET /', () => {
    //test case to check if the response status is 200
    it('should return 200', done => {
        //use supertest to send a GET request to the root URL and expect a 200 status code
        request(app).get('/').expect(200, done)
    });
});