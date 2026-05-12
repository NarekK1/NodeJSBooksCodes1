//importing a module without an extension CommonJS style
const simple = require('./simple');

//logging the results of the functions in the simple module
console.log(simple.hello());
//logs the results of the functions in the simple module
console.log(`${simple.next()}`);
//logs the results of the functions in the simple module
console.log(`${simple.next()}`);
