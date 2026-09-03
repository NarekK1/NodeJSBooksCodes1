import EventEmitter from 'node:events';

//create an event emitter instance
const emitter = new EventEmitter();

//define event handlers
emitter.on('MyEvent1', () => console.log('MyEvent1'));
emitter.on('MyEvent2', (a, b) => console.log(`MyEvent2 a: ${a} b: ${b}`));

//emit events
emitter.emit('MyEvent1');
emitter.emit('MyEvent2', 10, 6);

//get event names in the console
console.log(emitter.eventNames());