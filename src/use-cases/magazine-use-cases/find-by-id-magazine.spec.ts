import { describe, expect, it } from 'vitest';
import { InMemoryMagazineRepository } from '../../../test/in-memory-repository/in-memory-magazine';
import { CreateMagazine } from './create-magazine';
import { FindByIdMagazine } from './find-by-id-magazine';


describe('Find by id magazine',() => {
    it('should be able to find by id a magazine', async () => {
        const magazineRepository = new InMemoryMagazineRepository();
        const createMagazine = new CreateMagazine(magazineRepository);
        const findByIdMagazine = new FindByIdMagazine(magazineRepository);

        const magazine =  await createMagazine.execute({
            theme: 'Lorem Ipsum',
            descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
                consectetur, adipisci velit`,
            quarter: '1ª',
            year: '2023',
            ageGroup: 'Jovens'
        });

        await expect(findByIdMagazine.execute(magazine.id)).resolves.toBeTruthy();
    });

    it('should not be able to find a non existing magazine', async () => {
        const magazineRepository = new InMemoryMagazineRepository();
        const createMagazine = new CreateMagazine(magazineRepository);
        const findByIdMagazine = new FindByIdMagazine(magazineRepository);

        await createMagazine.execute({
            theme: 'Lorem Ipsum',
            descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
            consectetur, adipisci velit`,
            quarter: '1ª',
            year: '2023',
            ageGroup: 'Jovens'
        });

        await expect(findByIdMagazine.execute('example-id-fake')).rejects.toThrowError();
    });
});