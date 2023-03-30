import { describe, expect, it } from 'vitest';
import { InMemoryMagazineRepository } from '../../../test/in-memory-repository/in-memory-magazine';
import { CreateMagazine } from './create-magazine';
import { FindBySlugMagazine } from './find-by-slug-magazine';


describe('Find by slug magazine',() => {
    it('should be able to find by slug a magazine', async () => {
        const magazineRepository = new InMemoryMagazineRepository();
        const createMagazine = new CreateMagazine(magazineRepository);
        const findBySlugMagazine = new FindBySlugMagazine(magazineRepository);

        const magazine =  await createMagazine.execute({
            theme: 'Lorem Ipsum',
            descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
            consectetur, adipisci velit`,
            quarter: '1ª',
            year: '2023',
            ageGroup: 'Jovens'
        });
        await createMagazine.execute({
            theme: 'Lorem Ipsum 2',
            descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
            consectetur, adipisci velit`,
            quarter: '1ª',
            year: '2023',
            ageGroup: 'Jovens'
        });

        const magazineOne = await findBySlugMagazine.execute(magazine.slug);
        expect(magazineOne).toEqual(magazine);
    });

    it('should not be able to find a non existing magazine', async () => {
        const magazineRepository = new InMemoryMagazineRepository();
        const createMagazine = new CreateMagazine(magazineRepository);
        const findBySlugMagazine = new FindBySlugMagazine(magazineRepository);

        await createMagazine.execute({
            theme: 'Lorem Ipsum',
            descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
            consectetur, adipisci velit`,
            quarter: '1ª',
            year: '2023',
            ageGroup: 'Jovens'
        });

        await expect(findBySlugMagazine.execute('example-slug-fake')).rejects.toBeTruthy();
    });
});