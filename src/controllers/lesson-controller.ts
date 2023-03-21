import { Request, Response } from 'express';
import * as Yup from 'yup';
import { PrismaLessonRepository } from '../database/repositories/prisma-lesson-repository';
import { PrismaMagazineRepository } from '../database/repositories/prisma-magazine-repository';
import { CreateLesson } from '../use-cases/lesson-use-cases/create-lesson';
import { DeleteLesson } from '../use-cases/lesson-use-cases/delete-lesson';
import { FindBySlugLesson } from '../use-cases/lesson-use-cases/find-by-slug-lesson';
import { GetAllLesson } from '../use-cases/lesson-use-cases/get-all-lesson';
import { UpdateLesson } from '../use-cases/lesson-use-cases/update-lesson';


export class LessonController {
    async create(req: Request<{ magazineSlug: string }>, res: Response ) {
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
            return res.status(400).json(`message: ${error}`);
        }
    }
    
    async getAll(req: Request, res: Response ) {
        const lessonsRepository = new PrismaLessonRepository();
        const getAllLesson = new GetAllLesson(lessonsRepository);
        const {magazineSlug} = req.params;
        try {
            
            const Lessons = await getAllLesson.execute(magazineSlug);
            if(Lessons.length <= 0) {
                return res.status(404).json({
                    message: 'no registered lesson'
                });
            }
            return res.status(200).json(Lessons);

        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async findBySlug(req: Request<{magazineSlug: string, lessonSlug: string}>, res: Response ) {
        const lessonRepository = new PrismaLessonRepository();
        const findBySlugLessons = new FindBySlugLesson(lessonRepository);
        const {magazineSlug, lessonSlug} = req.params;
        try {
            const lesson = await findBySlugLessons.execute(magazineSlug, lessonSlug);
            if(!lesson){
                return res.sendStatus(404);
            }
            return res.status(200).json(lesson);
        } catch (error) {
            res.sendStatus(500);
        }
    }


    async update(req: Request<{magazineSlug: string, lessonSlug: string}>, res: Response ) {
        const lessonsRepository = new PrismaLessonRepository();
        const updateLesson = new UpdateLesson(lessonsRepository);
        const {magazineSlug, lessonSlug} = req.params;
        if(!req.body) {
            return res.status(400).json({'Error': 'No fields were provided'});
        }
        try {
            const lesson = await updateLesson.execute({magazineSlug, lessonSlug, ...req.body});
            return res.status(200).json(lesson);
        } catch (error) {
            return res.sendStatus(404);
        }
    
    }

    async delete(req: Request<{id: string}>, res: Response ) {
        const lessonRepository = new PrismaLessonRepository();
        const deleteLesson = new DeleteLesson(lessonRepository);
    
        try {
            await deleteLesson.execute(req.params.id);
        } catch (error) {
            return res.sendStatus(400);
        }
        
        res.sendStatus(200);
    }
}