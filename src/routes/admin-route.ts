import { Router } from 'express';
import adminController from '../controllers/admin-controller';




const adminRouter = Router();

adminRouter.get('/admin', adminController.getAll);
adminRouter.get('/admin/:id', adminController.findById);
adminRouter.post('/admin', adminController.create);
adminRouter.delete('/admin/:id', adminController.delete);

export default adminRouter;