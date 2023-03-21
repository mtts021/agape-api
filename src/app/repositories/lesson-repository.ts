import { Lesson } from '../entities/lesson';

export interface LessonRepository {
    create(lesson: Lesson): Promise<void>
    getAll(magazineSlug: string): Promise<Lesson[]>
    findById(id: string): Promise<Lesson | null>
    findBySlug(magazineSlug: string, lessonSlug: string): Promise<Lesson | null>
    update(lessons: Lesson): Promise<void>
    delete(id: string): Promise<void>
}