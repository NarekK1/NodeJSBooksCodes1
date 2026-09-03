import { on, EventEmitter } from 'node:events';

// This example demonstrates how to use the `on` function to listen for events emitted by an `EventEmitter` instance.
(async function() {
    //create an instance of EventEmitter
    const emitter = new EventEmitter();
    //schedule the emission of 'MyEvent' with different values using setImmediate and process.nextTick
    setImmediate(() => {
        //emit 'MyEvent' with values 10 and 20
        emitter.emit('MyEvent', 10);
        emitter.emit('MyEvent', 20);
    });
    //emit 'MyEvent' with values 30 and 40 using process.nextTick
    process.nextTick((v1, v2) => {
        //emit 'MyEvent' with values 30 and 40
        emitter.emit('MyEvent', v1);
        emitter.emit('MyEvent', v2);
    }, 30, 40);

    //use a for-await-of loop to listen for 'MyEvent' and log the emitted data
    for await (const data of on(emitter, 'MyEvent')){
        console.log(data);
    }
})();