import EventEmitter from "node:events";

//create an event emitter instance
const emitter = new EventEmitter();

//define event handlers
const listener1 = () => console.log('MyEvent listener1');
const listener2 = () => console.log('MyEvent listener2');

//add event listeners for MyEvent
emitter.on('MyEvent', listener1);
//add another event listener for MyEvent
emitter.on('MyEvent', listener2);

//emit MyEvent with listener1 
emitter.emit('MyEvent', listener1);

//remove listener1 for MyEvent
emitter.emit('MyEvent');

//remove listener2 for MyEvent
emitter.off('MyEvent', listener1);
//emit MyEvent again to see the effect of removing listener1
emitter.emit('MyEvent');

//remove listener2 for MyEvent using removeListener method
emitter.removeListener('myEvent', listener2);
//emit MyEvent again to see the effect of removing listener2
emitter.emit('MyEvent');