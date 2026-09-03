import { EventEmitter } from 'events';

//create an event emitter object
const emitter = new EventEmitter();

//add event listener for MyEvent that uses a regular function and checks the value of 'this'
emitter.on('MyEvent', function () {
    console.log(this === emitter);
});
//add event listener for MyEvent that uses an arrow function and checks the value of 'this'
emitter.on('MyEvent', () => {
    console.log(this === emitter);
});

//emit the MyEvent event
emitter.emit('MyEvent');