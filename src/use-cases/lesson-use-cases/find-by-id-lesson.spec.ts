import { describe, it, expect } from 'vitest';
import { InMemoryLessonRepository } from '../../../test/in-memory-repository/in-memory-lesson';
import { InMemoryMagazineRepository } from '../../../test/in-memory-repository/in-memory-magazine';
import { CreateMagazine } from '../magazine-use-cases/create-magazine';
import { CreateLesson } from './create-lesson';
import { FindByIdLesson } from './find-by-id-lesson';

describe('Find By id Lessons', async  ()=> {
    const lessonRepository = new InMemoryLessonRepository();
    const magazineRepository  = new InMemoryMagazineRepository();
    const createLesson = new CreateLesson(lessonRepository, magazineRepository);
    const createMagazine = new CreateMagazine(magazineRepository);
    const findByIdLesson = new FindByIdLesson(lessonRepository);
    
    const {slug} = await createMagazine.execute({
        theme: 'Lorem Ipsum',
        descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
        consectetur, adipisci velit`,
        quarter: '1ª',
        year: '2023',
        ageGroup: 'Jovens'
    });
    it('should be able to find by id a lesson', async()=> {

        const lesson =  await createLesson.execute({
            theme: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
            mainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Phasellus porttitor sem leo.`,
            bibleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo.
            Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus.`,
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo. 
            Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit. 
            Fusce sed finibus magna, ac ultrices massa. Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus. 
            In vel lobortis mauris. Pellentesque nec est dictum, accumsan lectus sed, dapibus massa.`,
            magazineSlug: slug
        });
        
        await createLesson.execute({
            theme: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit 2.',
            mainText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            bibleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo.
            Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus.`,
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo. 
            Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit. 
            Fusce sed finibus magna, ac ultrices massa.`,
            magazineSlug: slug
        });

        const lessonOne = await findByIdLesson.execute(lesson.id);
        expect(lessonOne).toEqual(lesson);
    });

    it('should not be able to find by slug a non existing lesson', async () => {
        await expect(findByIdLesson.execute('example-id-fake')).rejects.toThrowError();
    });
});