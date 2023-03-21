import { MagazineRepository } from '../../app/repositories/magazine-repository';
import { Magazine } from '../../app/entities/magazine';


export class FindBySlugMagazine {
    constructor(private magazineRepository: MagazineRepository) {}

    async execute(slug: string): Promise<Magazine> {
        const magazine = await this.magazineRepository.findBySlug(slug);
        
        if(!magazine) {
            throw new Error('magazine not found');
        }

        return magazine;
    }
}