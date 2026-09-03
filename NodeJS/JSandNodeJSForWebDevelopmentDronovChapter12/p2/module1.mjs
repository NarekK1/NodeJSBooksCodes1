// export let n = 10;
// export const str = 'string';
// export const obj = { c: 20 };
// export function print(msg){
//     console.log(msg);
// }
// export class Car {
//     constructor(m){
//         this.model = m;
//     }
//     getModel(){
//         return this.model;
//     }
// }
// export let n = 5;
// export default class{
//     constructor(m){
//         this.model = m;
//     }
// }
// global.myVar2 = 10;
// export let myVar2 = 10;
// export function test(n){
    // console.log(n);
// }
//global object is shared between modules
globalThis.myVar2 = 10;
//logs the value of myVar2 to the console
export function test(){
    console.log(globalThis.myVar1);
}