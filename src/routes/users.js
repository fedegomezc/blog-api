import { Router } from 'express';
import userController from '../controllers/users.js';
// import logged from '../middleware/logged.js';

const usersRouter = Router();

// usersRouter.use(logged);
usersRouter.get('/', userController.getBlogs);

export default usersRouter;