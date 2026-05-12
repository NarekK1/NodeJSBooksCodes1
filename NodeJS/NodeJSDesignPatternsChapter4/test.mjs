import { TaskQueue } from "./TaskQueue.mjs";
//function to iterate over tasks
function makeSimpleTask(name){
    //return a task function that log its start and completion
    return (cb) => {
        console.log(`${name} started`);
        //simulate async work with a timeout
        setTimeout(() => {
            console.log(`${name} completed`);
            cb()
        }, Math.random() * 2000);
    };     
}
//create a TaskQueue with concurrency of 2
const queue = new TaskQueue(2);
//define two main tasks that add subtasks to the queue
function task1(cb){
    //logs the start of task 1
    console.log('Task 1 started');
    //add subtasks to the queue
    queue.pushTask(makeSimpleTask('task1 -> subtask1'));
    queue.pushTask(makeSimpleTask('task1 -> subtask2'));
    //simulate async work with a timeout
    setTimeout(function(){
        //log the completion of task 1
        console.log('Task 1 completed');
        //call the callback to signal completion
        cb();
    }, Math.random() * 2000);
}
//define task 2 similarly
function task2(cb){
    //log the start of task 2
    console.log("Task 2 started");
    //add subtasks to the queue
    queue.pushTask(makeSimpleTask('task2 -> subtask 1'))
    .pushTask(makeSimpleTask('task2 -> subtask 2'))
    .pushTask(makeSimpleTask('task2 -> subtask 3'));
    //simulate async work with a timeout
    setTimeout(function(){
        //log the completion of task 2
        console.log('Task 2 completed');
        //call the callback to signal completion
        cb();
    }, Math.random() * 2000);

}
//add the main tasks to the queue
queue.pushTask(task1).pushTask(task2);