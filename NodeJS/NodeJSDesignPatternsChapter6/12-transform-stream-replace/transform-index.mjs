import { ReplaceStream } from "./replace-stream.mjs";

//replace 'Word' with 'Node.js' in the input stream
const replaceStream = new ReplaceStream('World', 'Node.js');
//listen for data events to output transformed chunks
replaceStream.on('data', chunk => console.log(chunk.toString()));

//write data to the  transform stream
replaceStream.write('Hello W');
//write more data to the transform stream
replaceStream.write('orld!');
//end the writable side of the transform stream
replaceStream.end();