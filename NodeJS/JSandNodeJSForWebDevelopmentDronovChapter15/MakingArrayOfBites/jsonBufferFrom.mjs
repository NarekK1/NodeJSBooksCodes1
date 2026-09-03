//create a buffer from an array of bytes
const buf1 = Buffer.from([1, 2, 3]);
//the buffer will contain the bytes
const json = JSON.stringify(buf1);
//the JSON string will contain the type and data of the buffer, which can be used to recreate the buffer later
console.log(json);
//parse the JSON string to get the data for the buffer
const buf2 = Buffer.from(JSON.parse(json));
//the buffer created from the JSON string will have the same bytes as the original buffer
console.log(buf2);
//the toJSON method of the buffer returns an object with the type and data of the buffer, which can be used to recreate the buffer later
const obj = buf1.toJSON();
console.log(obj);
//create a buffer from the object returned by the toJSON method
const buf3 = Buffer.from(obj);
//the buffer created from the object will have the same bytes as the original buffer
console.log(buf3);