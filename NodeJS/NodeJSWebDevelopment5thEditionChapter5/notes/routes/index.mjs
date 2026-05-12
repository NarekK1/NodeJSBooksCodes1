import { default as express } from 'express';
import { NotesStore as notes } from '../app.mjs';
// import { default as hbs } from 'hbs';
// import * as path from 'path';
// import { default as logger } from 'morgan';
// import { default as cookieParser } from 'cookie-parser';
// import { default as bodyParser } from 'body-parser';
// import * as http from 'http';
// import { approotdir } from '../approotdir.mjs';

//define __dirname for use in this module
// const __dirname = approotdir;
// import { normalizePort, onError, onListening, handle404, basicErrorHandler } from './appsupport.mjs';
// import { router as indexRouter } from './routes/index.mjs';

//export the app for use in other modules
export const router = express.Router();
/* GET home page. */
router.get('/', async (req, res, next) => {
  try{
    const keylist = await notes.keylist();
    const keyPromises = keylist.map(key => notes.read(key));
    const notelist = await Promise.all(keyPromises);
    res.render('index', { title: 'Notes', notelist: notelist });
  }
  catch(err){
    next(err);
  }
});

