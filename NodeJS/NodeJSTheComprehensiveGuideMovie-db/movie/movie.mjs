//import express module
import { Router }  from "express";
//import the data and controller function
import { listAction } from "./controller.mjs";
//create a router instance
const router = Router();
//define a route to get all movies
router.get('/', listAction);
//exports the router
export { router }; 