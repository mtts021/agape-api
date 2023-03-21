import {describe, expect, it} from 'vitest';
import { Magazine } from './magazine';

describe('Entitie Magazine', () => {
    it('should be able to create an magazine', () => {
        const magazine = new Magazine({
            theme: 'Lorem Ipsum',
            descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
            consectetur, adipisci velit`,
            quarter: '1ª',
            year: '2023',
            ageGroup: 'Jovens'
        });
        expect(magazine).toBeInstanceOf(Magazine);
    });

    it('should not be able to create magazine with theme with less than 10 characteres', () => {
        
        expect(()=>{
            new Magazine({
                theme: 'Lorem Ips',
                descriptionTheme: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, 
                    consectetur, adipisci velit`,
                quarter: '1ª',
                year: '2023',
                ageGroup: 'Jovens'
            });
        }).toThrow();
    });
});