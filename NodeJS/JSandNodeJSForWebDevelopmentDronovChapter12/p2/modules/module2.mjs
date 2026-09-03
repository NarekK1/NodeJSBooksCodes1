export const str = 'string';
export function f2(){
    //logs a string to the console that includes the value of import.meta.url
    console.log(`f2() - ${import.meta.url}`);
}