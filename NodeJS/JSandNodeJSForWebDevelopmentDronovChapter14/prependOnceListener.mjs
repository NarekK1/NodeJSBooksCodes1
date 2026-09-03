import EventEmitter from "node:events";

//create an event emitter object
const emitter = new EventEmitter();

//event that will be emitted only once
emitter.once('MyEvent', (n, k) => {
    console.log(`MyEvent once() ${n}, ${k}`);
});
//event that will be emitted only once and will be called before the previous one because it its added with prependOnceListener()
emitter.prependOnceListener('MyEvent', (n, k) => {
    console.log(`MyEvent prependOnceListener() ${n}, ${k}`);
});

//emit the MyEvent event
emitter.emit('MyEvent', 10, 3);
emitter.emit('MyEvent', 20, 5);