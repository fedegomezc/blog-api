import { Router } from 'express';
import userController from '../controllers/users.js';
import logged from '../middleware/logged.js';

const usersRouter = Router();

usersRouter.get('/profile', logged, userController.profile);
usersRouter.post('/blogs', logged, userController.createBlog)

export default usersRouter;