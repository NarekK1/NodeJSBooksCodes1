//imports the util module, 
const util = require('util');
//creates two values A and B 
const A = "a different value A";
const B = "a different value B";
//imports the module1.js file 
const m1 = require('./module1');
//logs the values of A and B, and the object returned by the values function from module1.js
console.log(`A=${A} B=${B} value=${util.inspect(m1.values())}`);
//modifies the values of A and B,  
console.log(`${m1.A} ${m1.B}`);
//logs the modified values of A and B, and the object returned by the values function from module1.js
const vals = m1.values();
//modifies the values of A and B in the object returned by the values function from module1.js
vals.B = "something completely different";
//logs the modified values of A and B
console.log(util.inspect(vals));
//logs the object returned by the values function from module1.js, which should still have the original values of A and B
console.log(util.inspect(m1.values()));