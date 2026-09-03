// const module1 = require('./module1.cjs');
//log the cache object to see the cached modules
// console.log(require.cache);
//get the path of the module1.cjs
// const path = require.resolve('./module1.cjs');
//log the path of the module1.cjs
// console.log(`path = ${path}`);
//delete the module1.cjs from the cache
// delete require.cache[path];
//require the module1.cjs again
// const module2 = require('./module1.cjs');
//log the module1 and module2 to see if they are the same
// console.log(module1 === module2);

const module1 = require('modules');