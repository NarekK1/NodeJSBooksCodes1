import { EventEmitter } from 'events';

//create an instance of the EventEmitter class
let emitter = new EventEmitter();

//add an event listener for the 'MyEvent' event
emitter.on('MyEvent', () => console.log('MyEvent on()'));
//add another event listener for the 'MyEvent' event
emitter.addListener('MyEvent', () => console.log('MyEvent addListener()'));

//emit the 'MyEvent' event
emitter.emit('MyEvent');