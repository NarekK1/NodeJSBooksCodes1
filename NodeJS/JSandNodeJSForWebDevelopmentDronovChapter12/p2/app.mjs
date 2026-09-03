// import { stdout } from 'process';
// import { delimiter, sep } from 'path';
//logs the path delimiter and separator to the console
// console.log(delimiter);
// console.log(sep);
//logs a string to the console
// stdout.write('String');
// import * as m from './module1.mjs';
//logs the value of m to the console
// console.log(m);
// import * as module1 from './module1.mjs';
// import * as module2 from './modules/module1.mjs';
// import * as module3 from '../module1.mjs';
// import{ n, str as s, obj, print, Car } from './module1.mjs';
// console.log(n);
// console.log(s);
// console.log(obj);
// let car = new Car('Audi');
// print( car.getModel() );
// import * as obj from './modules/allModules.mjs';
//logs the value of obj to the console
// console.log(obj.n);
// console.log(obj.s);
// console.log(obj.o);
//calls the f1, f2, and f3 functions from obj
// 
// console.log(obj);
// import * as obj from './test.cjs';
// obj.default.print('Variant 1');
// import * as obj from './myJSON.json';
// console.log(obj); 
// import  json from './myJSON.json';
// console.log(json);
// console.log(json.id);
// console.log(json.status);
// import { test, myVar2 } from './module1.mjs';
//global object is shared between modules
// global.myVar1 = 5;
// let myVar1 = 5;
// test(myVar1);
// console.log(global.myVar2);
// console.log(myVar1);
// console.log(myVar2);
import { test } from './module1.mjs';
globalThis.myVar1 = 5;
test();
console.log(globalThis.myVar2);
console.log(myVar1);
console.log(myVar2);