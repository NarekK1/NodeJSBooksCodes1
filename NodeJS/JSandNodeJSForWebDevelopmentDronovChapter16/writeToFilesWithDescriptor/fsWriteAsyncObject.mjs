import fs from 'fs'

//object to write to file
const obj = {
    a: 10,
    b: 20,
    //method to convert object to string
    toString: function(){
        return 'a: ' + this.a + ', b: ' + this.b;
    }
}

//open file for writing and get file descriptor to write to file and handle error if any
fs.open('./writeToFilesWithDescriptor/file3.txt', 'w', function(err, fd){
    //handle error if any
    if(err){
        return;
    }

    //write to file using file descriptor and close file after writing
    fs.write(fd, obj.toString(), function(err, w, s){
        //handle error if any
        fs.close(fd);
    })
});