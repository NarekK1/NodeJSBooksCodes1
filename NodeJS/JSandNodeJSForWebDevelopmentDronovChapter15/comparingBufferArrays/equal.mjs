//create three buffer arrays and compare them using the equals method
const buf1 = Buffer.from([1, 2, 3]);
const buf2 = Buffer.from([1, 2, 3]);
const buf3 = Buffer.from([1, 2, 4]);

//compare buf1 and buf2 and buf1 and buf3 using the equals method and log the results to the console true if equal and false if not
console.log(buf1.equals(buf2));
console.log(buf1.equals(buf3));