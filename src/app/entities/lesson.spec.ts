import { describe, expect, it } from 'vitest';
import { Lesson } from './lesson';

describe('Entitie Lesson', () => {
    it('should be able to create an lesson', () => {
        const lesson = new Lesson({
            theme: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
            mainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Phasellus porttitor sem leo.`,
            bibleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo.
            Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus.`,
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo. 
            Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit. 
            Fusce sed finibus magna, ac ultrices massa. Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus. 
            In vel lobortis mauris. Pellentesque nec est dictum, accumsan lectus sed, dapibus massa.`,
            magazineSlug: 'magazine-slug'
        });

        expect(lesson).toBeInstanceOf(Lesson);
    });

    it('should not be able to create an lesson with mainText with less than 10 characteres', () => {
        
        expect(()=>{
            new Lesson({
                theme: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
                mainText: 'Lorem.',
                bibleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo.
                Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus.`,
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo. 
                Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit. 
                Fusce sed finibus magna, ac ultrices massa. Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus. 
                In vel lobortis mauris. Pellentesque nec est dictum, accumsan lectus sed, dapibus massa.`,
                magazineSlug: 'fc52efaf-bf1b-44a1-8164-6f5e4e6b864c'
            });
        }).toThrow();
    });
    
    it('should not be able to create an lesson with bibleText with less than 10 characteres', () => {
        
        expect(()=>{
            new Lesson({
                theme: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
                mainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Phasellus porttitor sem leo.`,
                bibleText: 'Lorem',
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo. 
                Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit. 
                Fusce sed finibus magna, ac ultrices massa. Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus. 
                In vel lobortis mauris. Pellentesque nec est dictum, accumsan lectus sed, dapibus massa. `,
                magazineSlug: 'magazine-slug'
            });
        }).toThrow();
    });

    it('should not be able to create an lesson with content with less than 100 characteres', () => {
        
        expect(()=>{
            new Lesson({
                theme: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
                mainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Phasellus porttitor sem leo.`,
                bibleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo.
                Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus.`,
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                magazineSlug: 'magazine-slug'
            });
        }).toThrow();
    });

    it('should not be able to create an lesson with theme with less than 15 characteres', () => {
        
        expect(()=>{
            new Lesson({
                theme: 'Neque porro qu',
                mainText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Phasellus porttitor sem leo.`,
                bibleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo.
                Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus.`,
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem leo. 
                Praesent viverra, eros porta mollis commodo, tortor nibh placerat arcu, a ultricies urna ligula at elit. 
                Fusce sed finibus magna, ac ultrices massa. Proin dolor magna, mattis quis dictum sit amet, pharetra sollicitudin lectus. 
                In vel lobortis mauris. Pellentesque nec est dictum, accumsan lectus sed, dapibus massa. `,
                magazineSlug: 'magazine-slug'
            });
        }).toThrow();
    });
});