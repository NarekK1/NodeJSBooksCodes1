//ignores periods and commas
const ignore = /[\.,]/g;
//seperates words by spaces
const seperator = ' ';
//counts the number of times each word appears in a sentence
export function wordCount(sentence) {
    return sentence
        .replace(ignore, '')
        .toLowerCase()
        .split(seperator)
        .reduce((prev, current) =>{
            prev[current] = prev[current] + 1 || 1;
            return prev;
        }, {});
}
