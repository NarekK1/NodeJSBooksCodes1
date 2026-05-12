import { createServer } from 'node:http';

let usersCount;

//this server will be very slow, because it will block the event loop for a long time
createServer((req, res) => {
    //simulate a long running task
    for(let i = 0; i < 1e8; i++){

    };

    //write the process id to the response
    res.write(`Process ${process.pid}\n`);
    //end the response with the number of users
    res.end(`Users: ${usersCount}`);
})
//listen on port 3000
.listen(3000, () => {
    //log the process id
    console.log(`Process ${process.pid}`);
});

//listen for messages from the primary process to update the users count
process.on('message', msg => {
    //update the users count with the value sent from the primary process,
    usersCount = msg.usersCount;
});

//simulate a random crash after a random amount of time
setTimeout(() => {
    //close the server and exit the process with a non-zero exit code to indicate a crash
    process.exit(1);
}, Math.random() * 10000);