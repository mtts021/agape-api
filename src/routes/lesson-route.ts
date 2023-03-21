import { Router } from 'express';
import { LessonController } from '../controllers/lesson-controller';


const lessonRouter = Router();
const lessonController = new LessonController();


lessonRouter.get('/magazine/:magazineSlug/lessons', lessonController.getAll);
lessonRouter.get('/magazine/:magazineSlug/lesson/:slug', lessonController.findBySlug );
lessonRouter.post('/magazine/:magazineSlug/lesson', lessonController.create);
lessonRouter.put('/magazine/:magazineSlug/lesson/:lessonSlug', lessonController.update);
lessonRouter.delete('/magazine/:magazineSlug/lesson/:id', lessonController.delete);

export default lessonRouter;