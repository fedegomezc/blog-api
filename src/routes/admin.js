import { Router } from 'express';
import adminController from '../controllers/admin.js';
import logged from '../middleware/logged.js';
import isAdmin from '../middleware/admin.js';

const adminRouter = Router();

adminRouter.use(logged);
adminRouter.use(isAdmin);

adminRouter.get('/', adminController.get);
adminRouter.put('/disable/:userId', adminController.disableUser)
adminRouter.put('/disableBlog/:blogId', adminController.disableBlog)

export default adminRouter;