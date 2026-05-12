import { Router } from "express";
import { listAction, removeAction, formAction, saveAction } from "./controller.mjs";
//create a router instance
const router = Router();
//define a route for get requests to the root path
router.get('/', listAction);
//define a route for deleting a movie by id
router.get('/delete/:id', removeAction);
//define a route for displaying the form for creating or editing a movie
router.get('/form/:id{.:ext}', formAction);
//define a route for handling form submissions to save a movie
router.post(/save/, saveAction);
//export the router
export { router };