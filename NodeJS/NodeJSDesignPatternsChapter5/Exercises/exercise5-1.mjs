async function PromiseAll(callback, numberOfTimes){
    const arr = [];
    try{
        for(let i = 0; i < numberOfTimes; i++){
            arr.push(await  Promise.resolve(callback));
        }
    }
    catch(err){
            return console.error(err);
        
    }
    return arr;
}
PromiseAll('AllahuAkbar', Math.floor(Math.random() * 10)).then(async data => console.log(data));