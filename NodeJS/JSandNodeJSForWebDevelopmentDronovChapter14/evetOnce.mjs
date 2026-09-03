import EventEmitter from "node:events";

//create an event emitter object
const emitter = new EventEmitter();

//event that will be emitted only once
emitter.once('MyEvent', (n, k) => {
    console.log(`MyEvent ${n} ${k}`);
})

//emit the MyEvent event
emitter.emit('MyEvent', 10, 3);
//no output because the event listener is removed after the first event is emitted
emitter.emit('MyEvent', 20, 4);