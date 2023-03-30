import slug from 'slug';
import { Lesson } from '../../app/entities/lesson';
import { LessonRepository } from '../../app/repositories/lesson-repository';
import { MagazineRepository } from '../../app/repositories/magazine-repository';

interface CreateLessonsRequest {
    theme: string
    mainText: string
    bibleText: string
    content: string
    magazineSlug: string
}

export class CreateLesson {
    constructor(
        private lessonRepository: LessonRepository, private magazineRepository: MagazineRepository
    ) {}

    async execute(request: CreateLessonsRequest): Promise<Lesson> {
        const {theme, mainText, bibleText, content, magazineSlug} = request;
        const lessonSlug = slug(theme);
        
        const existingMagazine = await this.magazineRepository.findBySlug(magazineSlug);
        if(!existingMagazine) {
            throw new Error('magazine does not exist');
        }
        
        const lessonAlreadyExists = await this.lessonRepository.findBySlug(magazineSlug, lessonSlug);
        if(lessonAlreadyExists) {
            throw new Error('lesson already exists');
        }
        
        const lesson = new Lesson({
            theme,
            mainText,
            bibleText, 
            content,
            magazineSlug
        });

        await this.lessonRepository.create(lesson);
        return lesson;
    }
}