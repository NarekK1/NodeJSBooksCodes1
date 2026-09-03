import passport from 'passport'
import { Strategy } from 'passport-discord';
import { DiscordUser } from '../mongoose/schemas/discord-user.mjs';

//serialize the user object to store only the user ID in the session
passport.serializeUser((user, done) => {
    console.log('Inside Serialize User');
    //log the user object to the console for debugging purposes
    console.log(user);
    //store the user ID in the session and call the done callback with null for the error and the user ID
    done(null, user.id);
});

//deserialize the user object to retrieve the full user object from the database using the stored user ID
passport.deserializeUser(async (id, done) => {
    //try-catch block to handle any errors that may occur during the process of finding the user in the database
    try{
        //variable to hold the user object that will be retrieved from the database
        const findUser = await DiscordUser.findById(id);

        //if the user is found, call the done callback with null for the error and the findUser object
        if(findUser){
          //call the done callback with null for the error and the findUser object
          return done(null, findUser);
        }
        //if the user is not found, call the done callback with null for the error and null for the user object
        else{
           //call the done callback with null for the error and null for the user object
           return done(null, null);
        }
    }
    //catch any errors that occur during the process of finding the user in the database and call the done callback with the error
    catch(err){
        //call the done callback with the error and null for the user object
        done(err, null);
    }
});

//this is the strategy for discord authentication using passport.js
export default passport.use(new Strategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:3000/api/auth/discord/redirect',
    scope: ['identify']
},
//this is the callback function that will be called after the user has authenticated with discord
async (accessToken, refreshToken, profile, done) => {
    //variable to hold the user object that will be retrieved from the database
    let findUser;
    //use a try-catch block to handle any errors that may occur during the process of finding the user in the database
    try{
        //find the user in the database based on the provided discordId
        findUser = await DiscordUser.findOne({ discordId: profile.id });

    }
    //catch any errors that occur during the process of finding the user in the database and call the done callback with the error
    catch(err){
        //call the done callback with the error and null for the user object
        return done(err, null);
    }
    //if the user is not found, create a new user in the database with the provided profile information
    try{
        //if the user is not found, create a new user in the database with the provided profile information
        if(!findUser){
            //create a new user object with the provided profile information
            const newUser = new DiscordUser({
                //set the username and discordId fields of the new user object to the values from the profile object
                username: profile.username,
                discordId: profile.id
            });

            //save the new user object to the database 
            const newSavedUser = await newUser.save();
            //call the done callback with null for the error and the new user object
            done(null, newSavedUser);
        }
        //if the user is found, call the done callback with null for the error and the findUser objec
        return done(null, findUser);
    }
    //catch any errors that occur during the process of creating a new user in the database and call the done callback with the error
        catch(err){
            console.log(err);
            return done(err, null);
        }
}
));
