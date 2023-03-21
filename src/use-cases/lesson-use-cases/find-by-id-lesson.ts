import { Lesson } from '../../app/entities/lesson';
import { LessonRepository } from '../../app/repositories/lesson-repository';


export class FindByIdLesson {
    constructor(private lessonRepository: LessonRepository) {}

    async execute(id: string): Promise<Lesson | null> {
        const lesson = await this.lessonRepository.findById(id);
        if(!lesson) {
            throw new Error('lesson not found');
        }
        return lesson;
    }
}