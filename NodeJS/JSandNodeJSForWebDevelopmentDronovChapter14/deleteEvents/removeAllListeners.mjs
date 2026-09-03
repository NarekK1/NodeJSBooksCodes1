import EventEmitter from "node:events";

//create an event emitter instance
const emitter = new EventEmitter();

//define event handlers
const listener1 = () => console.log('MyEvent listener1');
const listener2 = () => console.log('MyEvent listener2');

//add event listeners for MyEvent
emitter.on('MyEvent1', listener1);
//add another event listener for MyEvent
emitter.on('MyEvent2', listener2);

//emit MyEvent to see both listeners in action
emitter.removeAllListeners();

//emit MyEvent1 again to see the effect of removing all listeners
emitter.emit('MyEvent1')
//emit MyEvent2 again to see the effect of removing all listeners
emitter.emit('MyEvent2');