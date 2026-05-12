process.stdin.on("data", function(data){
    //processing on each data event
    const name = data.toString().trim().toUpperCase();
    
    //checks if the name isn't empty
    if(name !== ""){
        process.stdout.write(`Hello ${name}`);
    }
    //throws error as a text if the name is empty
    else{
        process.stderr.write("Input was empty.")
    }
});
