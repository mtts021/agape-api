import { describe, expect, it } from 'vitest';
import { InMemoryLessonRepository } from '../../../test/in-memory-repository/in-memory-lesson';
import { InMemoryMagazineRepository } from '../../../test/in-memory-repository/in-memory-magazine';
import { CreateMagazine } from '../magazine-use-cases/create-magazine';
import { CreateLesson } from './create-lesson';
import { GetAllLesson } from './get-all-lesson';


describe('Get All Lessons', async () => {
    const lessonRepository = new InMemoryLessonRepository();
    const magazineRepository  = new InMemoryMagazineRepository();
    const createLesson = new CreateLesson(lessonRepository, magazineRepository);
    const getAllLesson = new GetAllLesson(lessonRepository);
    const createMagazine = new CreateMagazine(magazineRepository);

    const {slug} = await createMagazine.execute({
        theme: 'Lorem Ipsum',
        descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
        consectetur, adipisci velit`,
        quarter: '1ª',
        year: '2023',
        ageGroup: 'Jovens'
    });
    it('should be able to get all lessons', async () => {

 
        await createLesson.execute({
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
            mainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Phasellus porttitor sem leo.`,
            bibleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor se m leo.
            Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus.`,
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo. 
            Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit. 
            Fusce sed finibus magna, ac ultrices massa. Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus. 
            In vel lobortis mauris. Pellentesque nec est dictum, accumsan lectus sed, dapibus massa.`,
            magazineSlug: slug
        });

        const lessons = await getAllLesson.execute(slug);
        expect(lessons).toHaveLength(2);
    });
});