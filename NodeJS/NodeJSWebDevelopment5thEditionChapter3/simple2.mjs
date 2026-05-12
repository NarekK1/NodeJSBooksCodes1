let count = 0;
//exports a function that increments the count variable and returns the new value ES6 style
export function next(){
    return ++count;
}
//function that returns the square of the count variable
function squared(){
    return Math.pow(count, 2);
}
//exports a function that returns the string 'Hello, world!' ES6 style
export function hello(){
    return "Hello, world!";
}
//exports a default function that returns the current value of the count variable ES6 style
export default function(){
    return count;
}
//exports a constant variable that holds the meaning of life ES6 style
export const meaning = 42;
//exports a variable that holds the valuue ESM style
export let nocount = -1;
//exports a function that sets the value of nocount ESM style
export { squared };