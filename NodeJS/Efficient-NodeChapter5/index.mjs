import times from 'lodash.times';

//create a functio n that takes a string and prints it in a frame of asterisks
const printInFrame = text => {
    //calculate the width of the frame based on the length of the text
    const frameWidth = text.length + 4;
    
    //create a string that will hold the text to be printed
    let textToPrint = '';

    //add the top border of the frame
    times(frameWidth, () => (textToPrint = textToPrint + '*'));

    //add the text to be printed
    textToPrint = textToPrint + '\n' + '* ' + text + ' * ' + '\n';

    //add the bottom border of the frame
    times(frameWidth, () => (textToPrint = textToPrint + '*'));

    //print the text to the console
    console.log(textToPrint);
    //return the text to be printed
    return textToPrint;
};

//export the function to be used in other files
export default printInFrame;