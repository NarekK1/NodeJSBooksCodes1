import { Router } from 'express';

const router = Router();

//define a route for the /api/products path that sends a list of products as a response and logs the cookies from the request headers
router.get('/api/products', (request, response) => {
    //log the cookies from the request headers
    console.log(request.headers.cookie);
    //log the cookies from the request object
    console.log(request.cookies);
    //log the signed cookies from the request object
    console.log(request.signedCookies.hello);

    //check if the cookies from the request object contain a cookie with the name 'hello' and the value 'world'
    // if(request.cookies.hello && request.cookies.hello === 'world'){
    //check if the signed cookies from the request object contain a cookie with the name 'hello' and the value 'world'
    if(request.signedCookies.hello && request.signedCookies.hello === 'world'){
       //send a response to the client with a list of products
         return response.send([{ id: 123, name: 'chicken breast', price: 12.99 }]);
    }
    
    //send a response to the client with a message if the correct cookies are not present and a 403 Forbidden status code
    return response.status(403).send({ msg: "Sorry. You need the correct cookies "});
});

export default router;
