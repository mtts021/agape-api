import { Lesson } from '../../src/app/entities/lesson';
import { LessonRepository } from '../../src/app/repositories/lesson-repository';

export class InMemoryLessonRepository implements LessonRepository {
    public lessons: Lesson[] = [];
    
    async create(lesson: Lesson): Promise<void> {
        this.lessons.push(lesson);
    }
    
    async getAll(magazineSlug: string): Promise<Lesson[]> {
        const LessonOfMagazine = this.lessons.filter(lesson => lesson.magazineSlug  == magazineSlug);
        return LessonOfMagazine;
    }
    async findById(id: string): Promise<Lesson | null> {
        const lesson = this.lessons.find(lesson => lesson.id == id);
        
        if(!lesson){
            return null;
        }
        
        return lesson;
    }
    async findBySlug(magazineSlug: string, LessonSlug: string): Promise<Lesson | null> {
        const lesson = this.lessons.find(lesson => lesson.magazineSlug == magazineSlug && lesson.slug == LessonSlug);
        
        if(!lesson){
            return null;
        }
        return lesson;
    }
    
    async update(request: Lesson): Promise<void> {
        const lesson =  this.lessons.find(item => item.id == request.id);

        if(!lesson) {
            throw new Error('lesson not found');
        }
        
        const index = this.lessons.indexOf(lesson);
        this.lessons[index] = request;
    }

    async delete(lessonSlug: string): Promise<void> {
        const lesson =  this.lessons.find(Lessons => Lessons.slug == lessonSlug );
        if(!lesson){
            throw new Error('lesson not found');
        }
     
        const index = this.lessons.indexOf(lesson);

        if(index < 0){
            throw new Error('index not found');
        }

        this.lessons.splice(index, 1);
    }
}