import { InMemoryMagazineRepository } from '../../../test/in-memory-repository/in-memory-magazine';
import { expect, test } from 'vitest';
import { CreateMagazine } from './create-magazine';
import { DeleteMagazine } from './delete-magazine';

test('should be able to delete of a magazine', async ()=> {
    const magazineRepository = new InMemoryMagazineRepository();
    const deleteMagazine = new DeleteMagazine(magazineRepository);
    const createMagazine = new CreateMagazine(magazineRepository);

    const magazine = await createMagazine.execute({
        theme: 'Lorem Ipsum',
        descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
        consectetur, adipisci velit`,
        quarter: '1ª',
        year: '2023',
        ageGroup: 'Jovens'
    });

    await deleteMagazine.execute(magazine.slug);

    expect(magazineRepository.magazines).toHaveLength(0);
});