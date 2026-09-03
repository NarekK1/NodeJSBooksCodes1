import express from 'express';

//create an express application
const app = express();
//create a router for user-related routes
const userRouter = express.Router();

//define routes for the userRouter
userRouter.get('/show/:id', function(req, res){
    //send a response with the user ID from the request parameters
    res.send(`User ID: ${req.params.id}`);
});

//define another route for editing a user
userRouter.get('/edit/:id', function(req, res){
    //send a response indicating the user ID to be edited
    res.send(`Edit User ID: ${req.params.id}`);
});

//mount the userRouter on the '/user/' path
app.use('/user/', userRouter);

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
