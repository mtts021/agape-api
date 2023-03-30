import { expect, test } from 'vitest';
import { InMemoryLessonRepository } from '../../../test/in-memory-repository/in-memory-lesson';
import { InMemoryMagazineRepository } from '../../../test/in-memory-repository/in-memory-magazine';
import { CreateMagazine } from '../magazine-use-cases/create-magazine';
import { CreateLesson } from './create-lesson';
import { DeleteLesson }  from './delete-lesson';

test('should be able to delete of a magazine', async ()=> {
    const lessonRepository = new InMemoryLessonRepository();
    const deleteLesson = new DeleteLesson(lessonRepository);
    const magazineRepository  = new InMemoryMagazineRepository();
    const createLesson = new CreateLesson(lessonRepository, magazineRepository);
    const createMagazine = new CreateMagazine(magazineRepository);
    const magazine = await createMagazine.execute({
        theme: 'Lorem Ipsum',
        descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
        consectetur, adipisci velit`,
        quarter: '1ª',
        year: '2023',
        ageGroup: 'Jovens'
    });

    const lesson = await createLesson.execute({
        theme: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit 2',
        mainText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        bibleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo.
        Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus.`,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo. 
        Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit. 
        Fusce sed finibus magna, ac ultrices massa.`,
        magazineSlug: magazine.slug
    });
    await deleteLesson.execute(magazine.slug, lesson.slug);

    expect(lessonRepository.lessons).toHaveLength(0);
});