import { EventEmitter } from "events";
//export the TaskQueue class
export class TaskQueue extends EventEmitter{
    //initialize the TaskQueue with a concurrency limit
    constructor(concurrency){
        super();
        //set the concurrency limit and initialize running count and task queue
        this.concurrency = concurrency;
        this.running = 0;
        //initialize an empty array to hold tasks
        this.queue = [];
    }
    //method to add a task to the queue
    pushTask(task){
        //add the task to the queue
        this.queue.push(task);
        //schedule the next task execution
        process.nextTick(this.next.bind(this));
        return this;
    }
    //method to execute the next tasks in the queue
    next(){
        //if no tasks are running and the queue is empty, emit 'empty' event
        if(this.running === 0 && this.queue.length === 0){
            return this.emit('empty');
        }
        //while we can run more tasks and there are tasks in the queue
        while(this.running < this.concurrency && this.queue.length){
            //get the next task from the queue
            const task = this.queue.shift();
            //execute the
            task((err) => {
                //handle any error from the task
                if(err){
                    return this.emit('error', err);
                }
                //decrement the running count and schedule the next task execution
                this.running--;
                //schedule the next task execution
                process.nextTick(this.next.bind(this));
            });
            //increment the running count
            this.running++;
        }
    }
}