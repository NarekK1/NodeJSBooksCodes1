export class TaskQueue {
    //initialize the TaskQueue with a specified concurrency limit
    constructor(concurrency){
        //set the concurrency limit
        this.concurrency = concurrency;
        //initialize the count of running tasks
        this.running = 0;
        //initialize the task queue
        this.queue = [];
    }
    //method to process the next task in the queue asynchronously
    async runTask(task){
        //increment the running task count
        return new Promise((resolve, reject) => {
            //execute the task asynchronously
            this.queue.push(async () => task().then(resolve, reject));
        })
        //start processing the queue
        process.nextTick(this.next.bind(this));
    }
    //method to process tasks in the queue asynchronously
    async next(){
        //while there is capacity to run more tasks and there are tasks in the queue
        while(this.running < this.concurrency && this.queue.length){
            //dequeue the next task asynchronously
            const task = await this.queue.shift();
            //run the task
            task().finally(() => {
                //decrement the running task count
                this.running--;
                //process the next task in the queue
                this.next();
            })
            //increment the running task count
            this.running++
        }
    }
}