import { fork } from 'child_process';

// Fork the child process
const forked = fork('./child.mjs');

//listen for messages from the child process
forked.on('message', msg => {
    //log the message received from the child process
    console.log('Message from child', msg);
});

//send a message to the child process
forked.send({ hello: 'world' });