import slug from 'slug';
import { Magazine } from '../../app/entities/magazine';
import { MagazineRepository } from '../../app/repositories/magazine-repository';

interface MagazineCreateRequest {
    theme: string
    descriptionTheme: string
    quarter: string
    year: string
    ageGroup: string
}

export class CreateMagazine {
    constructor(private magazineRepository: MagazineRepository) {}

    async execute(request: MagazineCreateRequest): Promise<Magazine> {
        const {theme, descriptionTheme, quarter, year, ageGroup} = request;
        const magazineSlug = slug(theme);
        const magazineAlreadyExists = await this.magazineRepository.findBySlug(magazineSlug);
        if(magazineAlreadyExists) {
            throw new Error('Magazine already exists');
        }
        
        const magazine = new Magazine({
            theme,
            descriptionTheme,
            quarter,
            year,
            ageGroup
        });

        await this.magazineRepository.create(magazine);
        return magazine;
    }
}