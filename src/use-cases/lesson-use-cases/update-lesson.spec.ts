import { expect, test } from 'vitest';
import { InMemoryLessonRepository} from '../../../test/in-memory-repository/in-memory-lesson';
import { FindBySlugLesson } from './find-by-slug-lesson';
import { UpdateLesson } from './update-lesson';
import { CreateLesson } from './create-lesson';
import { InMemoryMagazineRepository } from '../../../test/in-memory-repository/in-memory-magazine';
import { CreateMagazine } from '../magazine-use-cases/create-magazine';

test('should be able to update of a Lessons', async () => {
    const lessonRepository = new InMemoryLessonRepository();
    const magazineRepository  = new InMemoryMagazineRepository();
    const createLesson = new CreateLesson(lessonRepository, magazineRepository);
    const updateLessons = new UpdateLesson(lessonRepository);
    const findBySlugLesson = new FindBySlugLesson(lessonRepository);
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
        theme: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        mainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Phasellus porttitor sem leo.`,
        bibleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo.
        Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus.`,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo. 
        Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit. 
        Fusce sed finibus magna, ac ultrices massa. Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus. 
        In vel lobortis mauris. Pellentesque nec est dictum, accumsan lectus sed, dapibus massa.`,
        magazineSlug: magazine.slug
    });
    


    await updateLessons.execute({
        magazineSlug: magazine.slug,
        lessonSlug: lesson.slug,
        theme: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
    });
    const lessonOne = await findBySlugLesson.execute(magazine.slug, lesson.slug);
    expect(lessonOne?.updatedAt).toBeInstanceOf(Date);
    
});