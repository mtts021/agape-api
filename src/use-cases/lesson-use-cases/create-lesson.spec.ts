import { describe, expect, it } from 'vitest';
import { InMemoryLessonRepository } from '../../../test/in-memory-repository/in-memory-lesson';
import { InMemoryMagazineRepository } from '../../../test/in-memory-repository/in-memory-magazine';
import { CreateMagazine } from '../magazine-use-cases/create-magazine';
import { CreateLesson } from './create-lesson';

describe('Create Lessons', async ()=> {
    const lessonRepository = new InMemoryLessonRepository();
    const magazineRepository  = new InMemoryMagazineRepository();
    const createLesson = new CreateLesson(lessonRepository, magazineRepository);
    const createMagazine = new CreateMagazine(magazineRepository);

    const {slug} = await createMagazine.execute({
        theme: 'Lorem Ipsum',
        descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
        consectetur, adipisci velit`,
        quarter: '1ª',
        year: '2023',
        ageGroup: 'Jovens'
    });

    it('should be able to create a Lesson', async ()=> {

        const lesson = await createLesson.execute({
            theme: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
            mainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Phasellus porttitor sem leo.`,
            bibleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo.
             Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit.`,
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo. 
            Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit.`,
            magazineSlug: slug
        });
        expect(lessonRepository.lessons).toHaveLength(1);
        expect(lessonRepository.lessons[0]).toEqual(lesson);
    });

    
    it('should not be able to create two lesson with the same theme', async ()=> {
        expect( async ()=> {
            await createLesson.execute({
                theme: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
                mainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Phasellus porttitor sem leo.`,
                bibleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo.
             Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit.`,
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo. 
            Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit.`,
                magazineSlug: slug
            });
        }).toThrowError;
    });
});