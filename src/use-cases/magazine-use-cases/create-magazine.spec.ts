import { describe, it, expect } from 'vitest';
import { CreateMagazine } from './create-magazine';
import { InMemoryMagazineRepository } from '../../../test/in-memory-repository/in-memory-magazine';

describe('Create Lessons', ()=> {
    it('should be able to create a magazines', async ()=> {
        const magazineRepository = new InMemoryMagazineRepository();
        const createMagazine = new CreateMagazine(magazineRepository);

        const magazine = await createMagazine.execute({
            theme: 'Lorem Ipsum',
            descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
            consectetur, adipisci velit`,
            quarter: '1ª Trimestre 2023',
            year: '2023',
            ageGroup: 'Jovens'
        });
        expect(magazineRepository.magazines).toHaveLength(1);
        expect(magazineRepository.magazines[0]).toEqual(magazine);
    });

    it('should not be able to create two magazines with the same theme', async ()=> {
        const magazineRepository = new InMemoryMagazineRepository();
        const createMagazine = new CreateMagazine(magazineRepository);

        await createMagazine.execute({
            theme: 'Lorem Ipsum',
            descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
            consectetur, adipisci velit`,
            quarter: '1ª',
            year: '2023',
            ageGroup: 'Jovens'
        });

        expect( async ()=> {
            await createMagazine.execute({
                theme: 'Lorem Ipsum',
                descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
                consectetur, adipisci velit`,
                quarter: '1ª Trimestre 2023',
                year: '2023',
                ageGroup: 'Jovens'
            }); 
        }).toThrowError;
    });
});