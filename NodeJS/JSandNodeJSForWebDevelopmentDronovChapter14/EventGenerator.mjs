import { EventEmitter } from 'events';

//create an instance of the EventEmitter class
let emitter = new EventEmitter();

//add an event listener for the 'MyEvent1' and 'MyEvent2' events
emitter.on('MyEvent1', () => console.log('MyEvent1'));
//add an event listener for the 'MyEvent2' event that takes two parameters
emitter.on('MyEvent2', (a, b) => console.log(`MyEvent2 a: ${a} b: ${b}`));

//emit the 'MyEvent1' and 'MyEvent2' events
emitter.emit('MyEvent1');
emitter.emit('MyEvent2', 10, 6);