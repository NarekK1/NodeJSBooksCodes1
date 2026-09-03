const o = { c: 20 };

export function f3(){
    //logs a string to the console that includes the value of import.meta.url
    console.log(`f3() - ${import.meta.url}`);
};
export { o };