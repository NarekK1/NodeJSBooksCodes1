//task queue implementation with concurrency control
export class TaskQueuePC {
    //initialize the TaskQueue with a specified concurrency limit
    constructor(concurrency){
        //set the concurrency limita
        this.concurrency = concurrency;
        this.taskQueue = [];
        //initialize the count of running tasks
        this.consumerQueue = [];
        //start the consumer workers
        for (let i = 0; i < concurrency; i++) {
            this.consumer();
        }
    }
    //method to get the next task in the queue asynchronously
    consumer(){
        //continuously process tasks via asynchronous recursion
        return this.getNextTask()
            .then(task => Promise.resolve().then(task))
            .then(() => this.consumer())
            .catch(err => {
                //log the error and keep consuming
                console.error(err);
                return this.consumer();
            });
    }   
    //method to add a new task to the queue
     getNextTask(){
        //return a Promise that resolves when a task is available
        return new Promise(resolve => {
            //if there are tasks in the queue, resolve immediately
            if(this.taskQueue.length !== 0){
                return resolve(this.taskQueue.shift());
            }
            //otherwise, wait for a task to be added
            this.consumerQueue.push(resolve)
        })
    }
    //method to run a new task
    runTask(task){
        //return a Promise that resolves when the task is complete
        return new Promise((resolve, reject) => {
            //wrap the task to handle resolution and rejection
            const taskWrapper = () => {
                //execute the task and handle its completion
                const taskPromise = task();
                //resolve or reject based on the task outcome
                taskPromise.then(resolve, reject);
                return taskPromise;
            }
            //if there are waiting consumers, assign the task immediately
            if(this.consumerQueue.length !== 0){
                //shift the next consumer and provide the task
                const consumer = this.consumerQueue.shift();
                consumer(taskWrapper);
            }
            //push the task to the queue if no consumers are waiting
            else{
                this.taskQueue.push(taskWrapper);
            }
        })
    }
  
}
