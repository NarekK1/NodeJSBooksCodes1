//import the wordCount function from the word-count module
import { wordCount as wc } from "./lib/word-count.mjs";
//example sentence to analyze
const sentence = 'Where there is much light, there is also much shadow.';
//get the word count using the imported function
const wordCount =  wc(sentence);
console.log(sentence);
//print the word counts
for(let i in wordCount){
    console.log(wordCount[i] + ' x ' + i);
}