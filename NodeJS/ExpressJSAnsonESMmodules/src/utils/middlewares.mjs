import { mockUsers } from "./constants.mjs";

//middleware function to resolve the index of a user by their id from the request params
export const resolveIndexByUserId = (request, response, next) => {
    //variable to hold the id from the request params
    const { body, params: { id } } = request;

    //parse the id from the request params and convert it to an integer
    const parsedId = parseInt(id);

    //check if the parsed id is a number and send a 400 Bad Request error response if it is not
    if(isNaN(parsedId)){
        //send a 400 Bad Request error response to the client
        return response.sendStatus(400);
    }

    //find the index of the user with the specified id in the mockUsers array
    const findUserIndex = mockUsers.findIndex(user => user.id === parsedId);

    //check if the user with the specified id was found and send a 404 Not Found error response if it was not
    if(findUserIndex === -1){
        //send a 404 Not Found error response to the client
        return response.sendStatus(404);
    }

    //attach the findUserIndex to the request object for use in subsequent middleware or route handlers
    request.findUserIndex = findUserIndex;

    //call the next middleware function in the stack
     next();
}
