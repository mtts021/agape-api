import { Lesson } from '../../app/entities/lesson';
import { LessonRepository } from '../../app/repositories/lesson-repository';


export class FindBySlugLesson {
    constructor(private lessonRepository: LessonRepository) {}

    async execute(magazienSlug: string, lessonSlug: string): Promise<Lesson | null> {
        const lesson = await this.lessonRepository.findBySlug(magazienSlug, lessonSlug);
        if(!lesson) {
            throw new Error('lesson not found');
        }
        return lesson;
    }
}
