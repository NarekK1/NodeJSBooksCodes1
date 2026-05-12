//async function to use await for dynamic import
async function simpleFn(){
    //dynamically imports the simple2.mjs module and assigns it to the simple2 variable
    const simple2 = await import('./simple2.mjs');
    //logs the result of calling the hello function from the simple2 module to the console
    console.log(simple2.hello());
    //logs the result of calling the next function from the simple2 module to the console
    console.log(simple2.next());
     //logs the result of calling the next function from the simple2 module to the console
    console.log(simple2.next());
    //logs the result of calling the default function from the simple2 module to the console
    console.log(`count = ${simple2.default()}`);
    //logs the meaning property from the simple2 module to the console
    console.log(`Meaning: ${simple2.meaning}`);
};
//calls the simpleFn function and catches any errors that may occur
simpleFn().catch(err => console.error(err));