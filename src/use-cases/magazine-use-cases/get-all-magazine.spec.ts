import { describe, it, expect } from 'vitest';
import { InMemoryMagazineRepository } from '../../../test/in-memory-repository/in-memory-magazine';
import { CreateMagazine } from './create-magazine';
import { GetAllMagazine } from './get-all-magazine';

describe('Get Terms', ()=> {
    it('should be able to get all magazines', async()=> {
        const magazineRepository = new InMemoryMagazineRepository();
        const createMagazine = new CreateMagazine(magazineRepository);
        const getAllMagazine = new GetAllMagazine(magazineRepository);

        await createMagazine.execute({
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

        const magazines = await getAllMagazine.execute();

        expect(magazines).toHaveLength(2);
    });
    it('should not be able to get all magazines if you don\'t have any registered', async()=> {
        const magazineRepository = new InMemoryMagazineRepository();
        const getAllMagazine = new GetAllMagazine(magazineRepository);

        expect(async ()=> {
            await getAllMagazine.execute();
        }).toThrowError;
    });
});