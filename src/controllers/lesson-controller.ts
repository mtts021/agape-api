import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';
import { PrismaLessonRepository } from '../database/repositories/prisma-lesson-repository';
import { PrismaMagazineRepository } from '../database/repositories/prisma-magazine-repository';
import { CreateLesson } from '../use-cases/lesson-use-cases/create-lesson';
import { DeleteLesson } from '../use-cases/lesson-use-cases/delete-lesson';
import { FindBySlugLesson } from '../use-cases/lesson-use-cases/find-by-slug-lesson';
import { GetAllLesson } from '../use-cases/lesson-use-cases/get-all-lesson';
import { UpdateLesson } from '../use-cases/lesson-use-cases/update-lesson';


export class LessonController {
    async create(req: Request<{ magazineSlug: string }>, res: Response, next: NextFunction ) {
        const lessonRepository = new PrismaLessonRepository();
        const magazineRepository = new PrismaMagazineRepository();
        const createLesson = new CreateLesson(lessonRepository, magazineRepository);
        const schema = Yup.object().shape({
            theme: Yup.string().required().min(15),
            mainText: Yup.string().required().min(10),
            bibleText: Yup.string().required().min(20),
            content: Yup.string().required().min(100),
        });
        try {
            await schema.validate(req.body);
        } catch (error) {
            const yupError = error as Yup.ValidationError;
            return res.status(400).json({
                error: yupError.message
            });
        }
        try {
            const {theme, mainText, bibleText, content } = req.body;
            const { magazineSlug } = req.params;
            const magazine = await createLesson.execute({
                theme,
                mainText,
                bibleText,
                content,
                magazineSlug
            });
            return res.status(201).json(magazine);
        } catch (error) {
            next(error);
        }
    }
    
    async getAll(req: Request, res: Response, next: NextFunction) {
        const lessonsRepository = new PrismaLessonRepository();
        const getAllLesson = new GetAllLesson(lessonsRepository);
        const {magazineSlug} = req.params;
        try {
            
            const Lessons = await getAllLesson.execute(magazineSlug);

            return res.status(200).json(Lessons);

        } catch (error) {
            next(error);
        }
    }

    async findBySlug(req: Request<{magazineSlug: string, lessonSlug: string}>, res: Response, next: NextFunction ) {
        const lessonRepository = new PrismaLessonRepository();
        const findBySlugLessons = new FindBySlugLesson(lessonRepository);
        const {magazineSlug, lessonSlug} = req.params;
        try {
            const lesson = await findBySlugLessons.execute(magazineSlug, lessonSlug);
            return res.status(200).json(lesson);
        } catch (error) {
            next(error);
        }
    }


    async update(req: Request<{magazineSlug: string, lessonSlug: string}>, res: Response, next: NextFunction ) {
        const lessonsRepository = new PrismaLessonRepository();
        const updateLesson = new UpdateLesson(lessonsRepository);
        const {magazineSlug, lessonSlug} = req.params;
        if(Object.keys(req.body).length <= 0) {
            return res.status(400).json({'Error': 'No fields were provided'});
        }
        try {
            const lesson = await updateLesson.execute({magazineSlug, lessonSlug, ...req.body});
            return res.status(200).json(lesson);
        } catch (error) {
            next(error);
        }
    
    }

    async delete(req: Request<{magazineSlug: string,lessonSlug: string}>, res: Response, next: NextFunction ) {
        const lessonRepository = new PrismaLessonRepository();
        const deleteLesson = new DeleteLesson(lessonRepository);
        const {magazineSlug, lessonSlug} = req.params;
    
        try {
            await deleteLesson.execute(magazineSlug, lessonSlug);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
        
    }
}