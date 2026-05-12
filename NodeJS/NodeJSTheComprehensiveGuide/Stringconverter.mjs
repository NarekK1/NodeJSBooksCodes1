//converts a string to a Uint8Array
const textEncoder = new TextEncoder();
// Example usage:
const encodedString = textEncoder.encode("hello World");
// Output: Uint8Array(11) [104, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]     
console.log(encodedString);

//converts a Uint8Array back to a string
const textDecoder = new TextDecoder();
//convert back to string
const decodedString = textDecoder.decode(encodedString);
console.log(decodedString);