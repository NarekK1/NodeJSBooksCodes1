import { EventEmitter } from 'events';
function helloEvents(){
    //create an EventEmitter instance
    const eventEmitter = new EventEmitter();
    //emit 'complete' event after 100 milliseconds with 'hello world' message
    setTimeout(() => eventEmitter.emit('complete', 'hello world'), 100);
    //return the EventEmitter instance
    return eventEmitter;
}
//function that uses a callback to return 'hello world' after 100 milliseconds
function helloCallback(cb){
    setTimeout(() => cb(null, 'hello world'), 100);
}
//use the callback function
helloEvents().on('complete', message => console.log(message));
//use the event emitter function
helloCallback((err, message) => console.log(message));