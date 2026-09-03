import { Router } from 'express';
import usersRouter from './users.mjs';
import productsRouter from './products.mjs';

//create an instance of router
const router = Router();

router.use(usersRouter);
router.use(productsRouter);

export default router;