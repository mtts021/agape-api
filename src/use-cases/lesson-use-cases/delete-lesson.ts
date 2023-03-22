import { LessonRepository } from '../../app/repositories/lesson-repository';

export class DeleteLesson {
    constructor(private lessonRepository: LessonRepository){}

    async execute(magazineSlug: string, lessonSlug: string): Promise<void> {
        const lesson = await this.lessonRepository.findBySlug(magazineSlug, lessonSlug);
        if(!lesson) {
            throw new Error('lesson not found');
        }

        this.lessonRepository.delete(lessonSlug);
    }
}