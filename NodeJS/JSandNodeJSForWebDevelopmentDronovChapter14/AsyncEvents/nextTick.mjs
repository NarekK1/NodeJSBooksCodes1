import EventEmitter from 'node:events';

//create an event emitter
const emitter = new EventEmitter();

//register an event listener for 'MyEvent'
emitter.on('MyEvent', n => {
    //schedule a callback to be executed in the next iteration of the event loop
    setImmediate(x => {
        //log the value of x when the callback is executed
        console.log('Immediate callback x =' + x);
    }, n);
});

//emit 'MyEvent' with the value 10
emitter.emit('MyEvent', 10);

//log 'End' to the console
console.log('End')