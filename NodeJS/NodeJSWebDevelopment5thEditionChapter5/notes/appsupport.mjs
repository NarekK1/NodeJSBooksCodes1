import { port } from './app.mjs';

//export function to normalize a port into a number, string, or false
export function normalizePort(val) {
    //parse the port into an integer
    const port = parseInt(val, 10);
    //if the port is not a number, return the original value
    if(isNaN(port)){
        //return the original value
        return val;
    }
    //if the port is a number and greater than or equal to 0, return the port
    else if(port >= 0){
        return port;
    }
    //return false if the port is not valid
    return false;
}

//export function to handle errors on the server
export function onError(error){
    //if the error is not related to the listen syscall, throw the error
    if(error.syscall !== 'listen'){
        throw error;
    }
    //get the bind information for the error message
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    //handle specific listen errors with friendly messages
    switch(error.code){
        //handle EACCES error
        case 'EACCES':
            //log the error message and exit the process
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        //handle EADDRINUSE error
        case 'EADDRINUSE':
            //log the error message and exit the process
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        //throw the error for any other error codes
        default:
            throw error;
    }
}

//import the server from app.mjs to use in the onListening function
import { server } from './app.mjs'
//export function to handle the listening event on the server
export function onListening(){
    //get the address information from the server
    const addr = server.address();
    //get the bind information for the log message
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    //log the listening message to the console
    console.log(`Listening on ${bind}`);
}

//export function to handle 404 errors
export function handle404(req, res, next){
    //create a new error with the message 'Not Found'
    const err = new Error('Not Found');
    //set the status of the error to 404 not found
    err.status = 404;
    //pass the error to the next middleware function
    next(err);
}

//export a basic error handler function to handle errors in the application
export function basicErrorHandler(err, req, res, next){
    //if the response headers have already been sent, delegate to the default Express error handler
    if(res.headersSent){
        return next(err);
    }
    //set the response locals with the error message and error object, only providing the full error in development mode
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //set the response status to the error status or 500 internal server error, and render the error page
    res.status(err.status || 500);
    res.render('error');
}