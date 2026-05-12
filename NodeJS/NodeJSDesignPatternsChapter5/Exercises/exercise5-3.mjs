//task queue implementation with concurrency control
export class TaskQueuePC {
    //initialize the TaskQueue with a specified concurrency limit
    constructor(concurrency){
        //set the concurrency limit
        this.concurrency = concurrency;
        this.taskQueue = [];
        //initialize the count of running tasks
        this.consumerQueue = [];
       concurrency(() => this.consumer(() => this.consumer()));
       
    }
    //method to get the next task in the queue asynchronously
    consumer(){
        //continuosly process tasks
    return new Promise((resolve, reject) => {
        while(true){
            //wait for the next task to be available
                //get the  next task
                const task = this.getNextTask();
                //execute the task
                resolve(task());
        }
                  }).catch(err => {
                //log the error
                console.error(err)
          
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
