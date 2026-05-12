//listen for messages from the parent process
process.on('message', msg => {
    //log the message received from the parent process
    console.log('Message from parent:', msg);
});

let counter = 0;

//send a message to the parent process every second
setInterval(() => {
    //send a message to the parent process with the current counter value
    process.send({ counter: counter++ });
}, 1000);