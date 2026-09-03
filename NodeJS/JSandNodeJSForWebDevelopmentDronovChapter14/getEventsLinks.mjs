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

//get listeners for MyEvent1 in the console
console.log(emitter.listeners('MyEvent1'));

//get raw listeners for MyEvent1 in the console
console.log(emitter.rawListeners('MyEvent1'));

//log the maximum number of listeners for the emitter
console.log(emitter.getMaxListeners());
//set the maximum number of listeners for the emitter to 20
emitter.setMaxListeners(20);
//log the maximum number of listeners for the emitter again
console.log(emitter.getMaxListeners());

//log the default maximum number of listeners for all emitters
console.log(EventEmitter.defaultMaxListeners);