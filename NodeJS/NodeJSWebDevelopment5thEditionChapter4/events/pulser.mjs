import EventEmitter from 'events';

//Pulser is an event emitter that emits a 'pulse' event every second
export class Pulser extends EventEmitter {
    //start the pulser
    start(){
        //emit a 'pulse' event every second
        setInterval(() => {
            //log the pulse event to the console with a timestamp
            console.log(`${new Date().toISOString} >>>> pulse`);
            //emit the 'pulse' event
            this.emit('pulse');
            //log the pulse event to the console with a timestamp
            console.log(`${new Date().toISOString} <<<< pulse`);
        }, 1000);
    }
}