import { EventEmitter } from 'events';
import { createServer} from 'http';
//define a port number
const PORT = 3000;
//create an event emitter instance
const myEmitter = new EventEmitter();
//register an event listener for 'userJoined' event
myEmitter.on('userJoined', function(username, usedId){
    //log a message when the event is emitted
    console.log(`${username} ${usedId} has joined to chat.`);
});
//create a simple HTTP server
createServer(function(request, response){
    //emit 'userJoined' event when a request is made to '/join' endpoint
    response.writeHead(200, {'Content-Type':'text/plain'});
    //check if the request URL is '/join
    if(request.url === '/join'){
        //emit the 'userJoined' event
        console.log('Join request received');
    }
    //closes the response
    response.end();
})
//start the server and listen on the defined port
.listen(PORT, function(){
    console.log(`Server is listening on port ${PORT}`);
});
let count = 0;
//register a one time listener for 'event
myEmitter.once('event', () => console.log(++count));
//emit the 'event' multiple times produces a new event 
myEmitter.emit('event'); 
//removes the listener for 'event
myEmitter.removeListener('event', () => console.log(++count))