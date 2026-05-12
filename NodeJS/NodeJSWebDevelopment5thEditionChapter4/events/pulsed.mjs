import { Pulser } from './pulser.mjs';

//pulser is an event emitter that emits a 'pulse' event every second
const pulser = new Pulser();
//listen for the 'pulse' event and log it to the console
pulser.on('pulse', () => {
    //log the pulse event to the console with a timestamp
    console.log(`${new Date().toISOString()} pulse recieved`);
});

//start the pulser
pulser.start();