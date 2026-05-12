//this file is expected to fail because of the way dynamic imports work.
//The import() function returns a promise that resolves to the module object, so we need to use .then() or async/await to access the module's exports.
const simple2 = import('./simple2.mjs');
//the following lines will throw an error because simple2 is a promise, not the module object.
console.log(simple2);
//the following lines will throw an error bacause simple2 is a promise, not the module object.
console.log(simple2.hello());
//the following lines will throw an error because simple2 is a promise, not the module object.
console.log(simple2.next());
//the following lines will throw an error because simple2 is a promise, not the module object.
console.log(simple2.next());
//the following lines will throw an error because simple2 is a promise, not the module object/
console.log(`count = ${simple2.default()}`);
//the following lines will throw an error because simple2 is a promise, not the module object.
console.log(`Meaning: ${simple2.meaning}`);