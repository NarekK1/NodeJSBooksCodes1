import os from 'node:os';
import { fork } from 'node:child_process';
import { createServer } from 'node:http';

//create a pool of workers based on the number of CPU cores
const cpus = os.availableParallelism();
//fork a worker for each CPU core
const workers = [];
//distribute incoming requests to workers based on the client's IP address
for(let i = 0; i < cpus; i++){
    //fork a worker process to handle requests
    workers.push(fork('./slow-server.mjs'));
}
//hash the client's IP address to determine which worker should handle the request
function getWorkerIndex(ip){
    //simple hash function to convert IP address to a number
    const hash = ip.split('.').reduce((hash, part) => Number(part) + 256 * hash);
    //module the hash by the number of workers to get the worker index
    return hash % cpus;
}

//create an HTTP server that listens for incoming requests
createServer((req, res) => {
    //get the client's IP address from the request
    const ip = req.socket.remoteAddress;
    //get the worker index based on the client's IP address
    const workerIndex = getWorkerIndex(ip);
    //send the request to the appropriate worker process
    workers[workerIndex].send({ req, res });
}).listen(3000);