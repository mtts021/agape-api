import { error } from 'node:console';
import { Lesson } from '../../app/entities/lesson';
import { LessonRepository } from '../../app/repositories/lesson-repository';



export class GetAllLesson {
    constructor(private lessonRepository: LessonRepository) {} 

    async execute(magazineSlug: string): Promise<Lesson[]> {
        const allLessons = await this.lessonRepository.getAll(magazineSlug);
        return allLessons;
    }
}