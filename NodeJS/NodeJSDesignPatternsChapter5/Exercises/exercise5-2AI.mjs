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
    //method to process the next task in the queue
    async runTask(task){
        //create a promise that will be resolved when the task completes
        return new Promise((resolve, reject) => {
            //add the task to the queue with its resolve/reject handlers
            this.queue.push(async () => {
                try {
                    //execute the task using await
                    const result = await task();
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            });
            //start processing the queue
            process.nextTick(this.next.bind(this));
        });
    }
    //method to process tasks in the queue
    next(){
        //while there is capacity to run more tasks and there are tasks in the queue
        while(this.running < this.concurrency && this.queue.length){
            //dequeue the next task
            const task = this.queue.shift();
            //increment the running task count
            this.running++;
            //run the task using async/await pattern
            task().then(() => {
                //decrement the running task count
                this.running--;
                //process the next task in the queue
                this.next();
            }).catch(() => {
                //decrement the running task count even on error
                this.running--;
                //process the next task in the queue
                this.next();
            });
        }
    }
}

// Test the TaskQueue
async function testTaskQueue() {
    const queue = new TaskQueue(2);
    
    const delay = (ms, value) => 
        new Promise(resolve => setTimeout(() => resolve(value), ms));
    
    console.log('Starting TaskQueue test with concurrency 2...\n');
    
    const tasks = [
        () => delay(1000, 'Task 1'),
        () => delay(500, 'Task 2'),
        () => delay(800, 'Task 3'),
        () => delay(300, 'Task 4'),
        () => delay(600, 'Task 5'),
    ];
    
    const startTime = Date.now();
    
    const promises = tasks.map((task, index) => 
        queue.runTask(task).then(result => {
            const elapsed = Date.now() - startTime;
            console.log(`${result} completed after ${elapsed}ms`);
            return result;
        })
    );
    
    const results = await Promise.all(promises);
    console.log('\nAll tasks completed:', results);
}

testTaskQueue().catch(console.error);