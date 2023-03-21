import { test, expect } from 'vitest';
import { InMemoryMagazineRepository } from '../../../test/in-memory-repository/in-memory-magazine';
import { CreateMagazine } from './create-magazine';
import { FindByIdMagazine } from './find-by-id-magazine';
import { UpdateMagazine } from './update-magazine';

test('should be able to update of a magazines', async () => {
    const magazinesRepository = new InMemoryMagazineRepository();
    const createMagazine = new CreateMagazine(magazinesRepository);
    const updateMagazine = new UpdateMagazine(magazinesRepository);
    const findByIdMagazine = new FindByIdMagazine(magazinesRepository);

    const magazine = await createMagazine.execute({
        theme: 'Lorem Ipsum',
        descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
        consectetur, adipisci velit`,
        quarter: '1ª',
        year: '2023',
        ageGroup: 'Jovens'
    });
    const {id, slug} = magazine;


    await updateMagazine.execute({
        magazineSlug: slug,
        theme: 'Lorem Ipsum',
        quarter: '2ª',
        year: '2023',
        ageGroup: 'Jovens'
    });
    const magazineOne = await findByIdMagazine.execute(id);

    expect(magazineOne?.updatedAt).toBeInstanceOf(Date);
    
});