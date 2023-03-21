import slug from 'slug';
import { Lesson } from '../../app/entities/lesson';
import { LessonRepository } from '../../app/repositories/lesson-repository';

interface UpdateLessonsRequest {
    magazineSlug: string,
    lessonSlug: string
    theme?: string
    mainText?: string
    bibleText?: string
    content?: string
}

export class UpdateLesson {
    constructor(private lessonRepository: LessonRepository ) {}

    async execute(request: UpdateLessonsRequest): Promise<Lesson> {
        const {magazineSlug, lessonSlug, theme, mainText, bibleText, content } = request;
        const lesson = await this.lessonRepository.findBySlug(magazineSlug, lessonSlug);

        if(!lesson) {
            throw new Error('lesson not found.');
        }
        if(theme) {
            lesson.theme = theme;
            lesson.slug = slug(theme);
        }
        if(mainText) {
            lesson.mainText = mainText;
        }
        if(bibleText) {
            lesson.bibleText = bibleText;
        }
        if(content) {
            lesson.content = content;
        }

        lesson.update();
        await this.lessonRepository.update(lesson);

        return lesson;
    }
}