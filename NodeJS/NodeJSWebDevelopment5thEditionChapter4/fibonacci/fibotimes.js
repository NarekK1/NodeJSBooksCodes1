const math = require('../math.js');

for(let num = 1; num < 8000; num++){
    let now = new Date().toISOString();
    console.log(`${now} Fibonacci for ${num} = ${math.fibonacciLoop(num)}`);
}