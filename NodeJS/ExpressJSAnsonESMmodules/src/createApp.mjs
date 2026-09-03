import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import express from 'express';
import mongoose from 'mongoose';
import './strategies/local-strategy.mjs';

export function createApp(){
    //create an instance of express
    const app = express();

    //use the express.json() middleware to parse incoming JSON requests
    app.use(express.json());
    
    //use the cookie-parser middleware to parse cookies from the request headers
    app.use(cookieParser('helloworld'));
    
    //use the express-session middleware to manage sessions with a secret, and set the cookie max age to 1 hour
    app.use(session(
        {
        secret: "anson the dev",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient()
        })
    
        }
    ));
    
    //use the passport.initialize() middleware to initialize passport for authentication
    app.use(passport.initialize());
    //use the passport.session() middleware to manage user sessions with passport
    app.use(passport.session());
    
    //use the routes from the index.mjs file for all routes
    app.use(routes);

    
    //define a route for the /api/auth/status path that checks if the user is authenticated 
    app.get('/api/auth/status', (request, response) => {
        //log a message to the console indicating that the /auth/status endpoint has been hit
        console.log(`Inside /auth/status endpoint`);
        //log the user object and session object to the console
        console.log(request.user);
        //log the session object to the console
        console.log(request.session);
        //log the session id to the console
        console.log(request.sessionID);
    
        //check if the user is authenticated and send a response with the user object if they are, or a 401 Unauthorized error response if they are not
        return request.user ? response.send(request.user) : response.sendStatus(401);
    });

    //define a route for the /api/auth/logout path that logs out the user and sends a response with a 200 OK status code if successful
app.post('/api/auth/logout', (request, response) => {
    //check if the user is authenticated and send a 401 Unauthorized error response if they are not
    if(!request.user){
        //send a 401 Unauthorized error response to the client
        return response.sendStatus(401);
    }

    //log out the user using the request.logout() method and send a response with a 200 OK status code if successful
    request.logout(err => {
        //handle any errors that occur during the logout process and send a 400 Bad Request error response if there is an error
        if(err){
            //send a 400 Bad Request error response to the client
            return response.sendStatus(400);
        }

        //send a 200 OK status code response to the client if the logout is successful
        response.sendStatus(200);
    });
});

    //define a route for the /api/auth path that authenticates a user with a username and password using passport's local strategy
    app.post('/api/auth', passport.authenticate('local'), (request, response) => {
        //send a 200 OK status code response to the client if the authentication is successful
        response.sendStatus(200);
    });

    //define a route for the /api/auth/discord path that authenticates a user with Discord using passport's Discord strategy
    app.get('/api/auth/discord', passport.authenticate('discord'));
    //define a route for the /api/auth/discord/redirect path that handles the redirect from Discord after authentication and sends a response with a 200 OK status code
    app.get('/api/auth/discord/redirect', passport.authenticate('discord'), (request, response) => {
        //log the session object and user object to the console
        console.log(request.session);
        console.log(request.user);
        //send a 200 OK status code response to the client
        response.sendStatus(200);
    });
    
    return app;
}