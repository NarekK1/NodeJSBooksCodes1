import * as simple2 from './simple2.mjs';

//logs the value of the default export, which is a string "Hello, World!"
console.log(simple2.hello());
//log the value of the named export meaning, which is 42
console.log(`${simple2.next()} ${simple2.squared()}`);
//logs the value of the default export, which is a function that returns the current count (0)
console.log(`${simple2.next()} ${simple2.squared()}`);
//logs the value of the default export, which is a function that returns the current count (1)
console.log(`${simple2.default()} ${simple2.squared()}`);
//logs the value of the default export, which is a function that returns the current count (2)
console.log(`${simple2.next()} ${simple2.squared()}`);
//logs the value of the named export meaning, which is 42
console.log(`${simple2.next()} ${simple2.squared()}`);
//logs the value of the default export, which is a function that returns the current count (3)
console.log(`${simple2.next()} ${simple2.squared()}`);
//logs the value of the default export, which is a function that returns the current count (4)
console.log(simple2.meaning);