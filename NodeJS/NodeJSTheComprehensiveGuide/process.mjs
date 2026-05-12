//unhandled Exception
process.on('unhadledRejection', function(error){
    console.error('unhandledRejection');
    console.error(error);
});
//example of unhandled promise rejection
function withPromise(){
    return Promise.reject("Whoops, an Error ouccured");
}
withPromise().then(function(){
    console.log('Promise resolved');
})
