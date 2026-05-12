const express = requre('express');
const app = express();

//view engine setup
app.use(function(err, req, res, next){
    //set locals, only providing error in development
    res.locals.message = err.message;
    //provide error details only in development environment
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render the error page with appropriate status code
    res.status(err.status || 500);
    //render the error page;
    res.render('error');
})

//export the app module for use in other files CommonJS syntax
module.exports = app;