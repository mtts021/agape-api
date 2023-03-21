import { Lesson } from '../../app/entities/lesson';
import { LessonRepository } from '../../app/repositories/lesson-repository';



export class GetAllLesson {
    constructor(private lessonRepository: LessonRepository) {} 

    async execute(magazineSlug: string): Promise<Lesson[]> {
        const allLesson = await this.lessonRepository.getAll(magazineSlug);
        return allLesson;
    }
}