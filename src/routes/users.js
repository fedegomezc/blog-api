import { Router } from 'express';
import userController from '../controllers/users.js';
import logged from '../middleware/logged.js';

const usersRouter = Router();

usersRouter.use(logged);
usersRouter.get('/profile', userController.profile);
usersRouter.post('/blogs', userController.createBlog);
usersRouter.put('/blogs/:blogId', userController.editBlog);
usersRouter.delete('/blogs/:blogId', userController.deleteBlog)


export default usersRouter;