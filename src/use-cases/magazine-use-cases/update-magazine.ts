import { MagazineRepository } from '../../app/repositories/magazine-repository';
import { Magazine } from '../../app/entities/magazine';
import slug from 'slug';

interface UpdateMagazineRequest {
    magazineSlug: string
    theme?: string
    quarter?: string
    year: string,
    ageGroup?: string
}

export class UpdateMagazine {
    constructor(private magazineRepository: MagazineRepository) {}

    async execute(request: UpdateMagazineRequest): Promise<Magazine> {

        const {magazineSlug, theme, quarter, year, ageGroup } = request;
        const magazine = await this.magazineRepository.findBySlug(magazineSlug);

        if(!magazine) {
            throw new Error('Magazine not found.');
        }
        if(theme) {
            magazine.theme = theme;
            magazine.slug = slug(theme);
        }
        if(quarter) {
            magazine.quarter = quarter;
        }
        
        if(year) {
            magazine.year = year;
        }

        if(ageGroup) {
            magazine.ageGroup = ageGroup;
        }

        magazine.update();
        await this.magazineRepository.update(magazine);

        return magazine;
    }
}