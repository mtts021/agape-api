import { Router } from 'express';
import { MagazineController } from '../controllers/magazine-controller';


const magazineRouter = Router();
const magazineController = new MagazineController();

magazineRouter.get('/magazine', magazineController.getAll);
magazineRouter.get('/magazine/:slug', magazineController.findBySlug);
magazineRouter.post('/magazine', magazineController.create);
magazineRouter.put('/magazine/:magazineSlug', magazineController.update);
magazineRouter.delete('/magazine/:magazineSlug', magazineController.delete);

export default magazineRouter;