import { default as simple, hello, next, meaning } from './simple2.mjs';

//logs the value of the default export, which is a string "Hello, World!"
console.log(hello());
//log the value of the named export meaning, which is 42
console.log(next());
//logs the value of the default export, which is a function that returns the current count (0)
console.log(next());
//logs the value of the default export, which is a function that returns the current count (1)
console.log(simple());
//logs the value of the default export, which is a function that returns the current count (2)
console.log(next());
//logs the value of the default export, which is a function that returns the current count (3)
console.log(next());
//logs the value of the default export, which is a function that returns the current count (4)
console.log(next());
//logs the value of the named export meaning, which is 42
console.log(meaning);