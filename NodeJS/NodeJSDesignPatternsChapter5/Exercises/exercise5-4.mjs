// asynhronous map function that works like Array.prototype.map
async function mapAsync(iterable, callback, concurrency){
    //results of array for concurrency to push and print given array when length matches concurrency length and print results concurrency length times
    const results = [];
    //print each item in iterable after awaiting its resolution
    iterable.forEach(async(item) => console.log(await item));
    //loop through callback and callback indexes
    for(let i = 0; i < callback.length; i++){
       await console.log(i);
    }
    //loop through concurrency and push awaited items to results array
    for(let j = 0; j < concurrency.length; j++){
        //push awaited concurrency items to results array
         results.push(await concurrency[j]);
         //loop trhough results and check if results length matches concurrency length
        for(let y = 0; y < results.length; y++){
            //check if results length matches concurrency length
        if(results[j] === concurrency.length){
            //print results array asynchronously
        console.log(await results);
        }
        
    }
}
}
mapAsync([1,2,3], [1,2,3], [1,2,3,4,5]);