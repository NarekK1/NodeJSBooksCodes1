
// (async function() {
//     let m = {};
//     try{
//         m = await import('./module1.mjs');
//     }
//     catch(e){
//         console.log('Couldnt load module.', e)
//     }
//     console.log(m);
// })();
const obj1 = require('myPackage');
const obj2 = require('myPackage/main');
console.log(obj1 === obj2);
import('myPackage/module1.mjs');
import('myPackage/module2');
