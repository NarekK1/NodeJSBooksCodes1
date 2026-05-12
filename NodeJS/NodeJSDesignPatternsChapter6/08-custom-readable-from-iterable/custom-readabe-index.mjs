//import the Readable class from the 'stream' module
import { Readable } from 'stream';

//create a readable stream from an array of mountain objects
const mountains = [
    {name: 'Everest', height:  8848},
    {name: 'K2', height: 8611},
    {name: 'Kangchenjunga', height: 8586},
    {name: 'Lhotse', height: 8516},
    {name: 'Makalu', height: 8485}
];
//create a readable stream from the mountains array
const mountainsStream = Readable.from(mountains);
//consume the stream and log each mountain's name and height
mountainsStream.on('data', mountain => console.log(`${mountain.name.padStart(14)} \t${mountain.height}`));