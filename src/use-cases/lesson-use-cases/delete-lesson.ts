import { LessonRepository } from '../../app/repositories/lesson-repository';

export class DeleteLesson {
    constructor(private lessonRepository: LessonRepository){}

    async execute(id: string): Promise<void> {
        const lesson = await this.lessonRepository.findById(id);
        if(!lesson) {
            throw new Error('lesson not found');
        }

        this.lessonRepository.delete(id);
    }
}