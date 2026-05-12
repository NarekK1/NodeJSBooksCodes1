import cluster from 'node:cluster';
import os from 'node:os';

//check if the current process is the primary process and if so, fork worker processes for each available CPU
if(cluster.isPrimary){
    //get the number of available CPUs
    const cpus = os.availableParallelism();

    //fork the process for each CPU
    console.log(`Forking for ${cpus} CPUs`);
    //the cluster module will automatically load balance incoming requests across the worker processes
    for(let i = 0; i < cpus; i++){
        //fork a new worker process
        cluster.fork();
    }
    //listen for exit events from worker processes to handle crashes
    cluster.on('exit', worker => {
        //if the worker process exited after disconnecting, it means it was intentionally killed, so we don't need to restart it
        if(worker.exitedAfterDisconnect === true){
            return;
        }
        //log the crash and start a new worket process to replace the crashed one
        console.log(`Woker ${worker.id} crashed.` + 'Starting a new worker...');
        //fork a new worker process to replace the crashed one
        cluster.fork();
    });
    //log instructions for restarting worker processes
    console.log(`To restart workers, use: kill -SIGUSR2 ${process.pid}`);

    //listen for the SIGUSR2 signal to gracefully restart worker processes
    process.on('SIGUSR2', () => {
        //get an array of all worker processes
        const workers = Object.values(cluster.workers);

        //function to restart a worker process at a given index in the workers array
        const restartWorker = workerIndex => {
            //if we've gone through all the workers, return
            const worker = workers[workerIndex];
            //if the worker process doesn't exist, return
            if(!worker){
                return;
            }
            //listen for the exit event of the worker process to know when it has finished restarting
            worker.on('exit', () => {
                //if the worker process exited after disconnecting, it means it was intentionally killed, so we don't need to restart it
                if(worker.exitedAfterDisconnect === false){
                    return;
                }

                //log the exit of the worker process and start a new worker process to replace it
                console.log(`Exited process ${worker.process.pid}`);

                //fork a new worker process to replace the exited one and listen for it to start listening for requests before restarting the next worker process
                cluster.fork().on('listening', () => {
                    //log the new worker process and restart the next worker process in the array
                    restartWorker(workerIndex + 1);
                });
            });

            //disconnect the worker process to trigger the exit event and start the restart process
            worker.disconnect();
        };

        //start the restart process by restarting the first worker process in the array
        restartWorker(0);
    });
}
//if the current process is a worker process, start the server
else{
    import('./slow-server.mjs');
}