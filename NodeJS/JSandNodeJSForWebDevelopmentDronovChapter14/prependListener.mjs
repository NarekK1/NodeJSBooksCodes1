import { EventEmitter } from 'events';

//create an event emitter object
const emitter = new EventEmitter();

//add event listener for MyEvent that uses a regular function and checks the value of 'this
emitter.on('MyEvent', n => console.log(`MyEvent on() ${n}`));

//add event listener for MyEvent that uses an arrow function and checks the value of 'this
emitter.prependListener('MyEvent', n => console.log(`MyEvent prependListener() ${n}`));

//emit the MyEvent event
emitter.emit('MyEvent', 1);