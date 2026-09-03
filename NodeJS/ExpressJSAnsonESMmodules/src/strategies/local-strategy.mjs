import passport from "passport";
import { Strategy } from 'passport-local';
import { mockUsers } from '../utils/constants.mjs';
import { User } from '../mongoose/schemas/user.mjs';
import { comparePassword } from '../utils/helpers.mjs';

//serialize the user object to store only the user ID in the session
passport.serializeUser((user, done) => {
    console.log('Inside Serialize User');
    //log the user object to the console for debugging purposes
    console.log(user);
    //store the user ID in the session and call the done callback with null for the error and the user ID
    done(null, user.id);
});

//deserialize the user object from the session using the stored user ID
passport.deserializeUser(async (id, done) => {
    //log a message to the console indicating that the deserialization process has started
    console.log('Inside Deserializer');
    //log the user ID to the console for debugging purposes
    console.log(`Deserializing user with ID: ${id}`);
    //use a try-catch block to handle any errors that may occur during the deserialization process
    try{
        //find the user in the mockUsers array based on the provided user ID
        // const findUser = mockUsers.find(user => user.id === id);
        const findUser = await User.findById(id);
        //if the user is not found, throw an error indicating that the user was not found
        if(!findUser){
            //throw an error indicating that the user was not found
            throw new Error('User not found');
        }
        //if the user is found, call the done callback with null for the error and the findUser object
        done(null, findUser);
    }
    //catch any errors that occur during the deserialization process and call the done callback with the error
    catch(err){
        //call the done callback with the error and null for the user object
        done(err, null)
    }
});

//configure the local strategy for passport authentication asynchronously using the provided username and password
export default passport.use(new Strategy(async (username, password, done) => {
    // console.log(`Username: ${username}`);
    // console.log(`Password: ${password}`);
    //handle the authentication result using a try-catch block
    try{
         //find the user in the mockUsers array based on the provided username
        //  const findUser = mockUsers.find(user => user.username === username);
        //if the user is not found, throw an error indicating that the user was not found
        // if(!findUser || findUser.password !== password){
            //report invalid credentials as an authentication failure
            // return done(null, false);
        // }

        //find the user in the database based on the provided username
        const findUser = await User.findOne({ username });

        //if the user is not found, throw an error indicating that the user was not found
        if(!findUser){
            //throw an error indicating that the user was not found
            throw new Error('User not found');
        }
        //if the user is found but the password does not match, throw an error indicating that the credentials are bad
        // else if(findUser.password !== password){
            //throw an error indicating that the credentials are bad
            // throw new Error('Bad Credentials');
        // }
        else if(!comparePassword(password, findUser.password)){
            //throw an error indicating that the credentials are bad
            throw new Error('Bad Credentials');
        }
        //if the user is found and the password matches, call the done callback with the user object
        done(null, findUser);
    }
    //catch any errors that occur during the authentication process and call the done callback with the error
    catch(err){
        //call the done callback with the error and null for the user object
        done(err, null)
    }
}));