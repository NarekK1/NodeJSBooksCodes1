import EventEmitter from 'events';

//create a class that extends EventEmitter
class MyClass extends EventEmitter{};

//create an instance of the class
const obj = new MyClass();

//add an event listener for the 'MyEvent' event
obj.on('MyEvent', () => console.log('MyEvent'));

//emit the 'MyEvent' event
obj.emit('MyEvent');
