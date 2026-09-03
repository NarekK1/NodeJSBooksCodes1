const arr = ['a', 'b', 'c'];

function getElement(num){
    if(num >= 0 && num < arr.length){
        return console.log(arr[num]);
    }
    else{
        return console.log('404 Not Found');
    }
}

getElement(3);