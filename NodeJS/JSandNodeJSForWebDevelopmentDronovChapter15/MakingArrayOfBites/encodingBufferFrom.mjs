//this file demonstrates how to create a buffer from different types of objects
let obj = {
    //the toPrimitive method is used to convert the object to a primitive value when the Buffer.from method is called with a string encoding
    [Symbol.toPrimitive](){
        return 'test';
    }
};

//when the Buffer.from method is called with a string encoding, it will call the toPrimitive method of the object to get the string value to encode
let buf = Buffer.from(obj, 'latin1');
console.log(buf);
//the buffer will contain the bytes corresponding to the string 'test' in latin1 encoding, which are [0x74, 0x65, 0x73, 0x74]
obj = {
    valueOf(){
        return [0x74, 0x65, 0x73, 0x74];
    }
};

//when the Buffer.from method is called with an object that has a valueOf method, it will call the valueOf method to get the value to encode
buf = Buffer.from(obj);
console.log(buf);
//the buffer will contain the bytes corresponding to the array returned by the valueOf method
buf = Buffer.from(new String('тест'));
console.log(buf);
//when the Buffer.from method is called with a String object, it will convert it to a primitive string and then encode it using utf-8 encoding by default
buf = Buffer.from(new String('тест'), 'utf-8');
console.log(buf);
