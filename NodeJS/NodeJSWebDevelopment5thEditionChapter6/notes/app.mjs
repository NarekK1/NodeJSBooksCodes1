// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
import { default as express } from 'express';
import { default as hbs } from 'hbs';
import * as path from 'path';
import { default as logger } from 'morgan';
import { default as cookieParser } from 'cookie-parser';
import { default as bodyParser } from 'body-parser';
import * as http from 'http';
import { approotdir } from './approotdir.mjs' 
const __dirname = approotdir;
import  { router  as indexRouter } from './routes/index.mjs';
// var usersRouter = require('./routes/users');
import { router as notesRouter } from './routes/notes.mjs';
import { normalizePort, onError, onListening, handle404, basicErrorHandler } from './appsupport.mjs';
import { InMemoryNotesStore } from './models/notes-memory.mjs';
import { error } from 'console';
export const NotesStore = new InMemoryNotesStore();
export const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/assets/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
// app.use('/assets/vendor/bootstrap', express.static(path.join(__dirname, 'theme', 'dist')));
app.use('/assets/vendor/bootstrap/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/assets/vendor/bootstrap/css', express.static(path.join(__dirname, 'minty')));
app.use('/assets/vendor/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/assets/vendor/popper.js', express.static(path.join(__dirname, 'node_modules', 'popper.js', 'dist', 'umd')));
app.use('/assets/vendor/feather-icons', express.static(path.join(__dirname, 'node_modules', 'feather-icons', 'dist')));
app.use('/', indexRouter);
app.use('/notes', notesRouter);

// catch 404 and forward to error handler
app.use(handle404);
app.use(basicErrorHandler);

export const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

export const server = http.createServer(app);
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);