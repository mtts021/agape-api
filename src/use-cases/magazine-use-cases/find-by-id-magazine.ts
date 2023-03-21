import { MagazineRepository } from '../../app/repositories/magazine-repository';
import { Magazine } from '../../app/entities/magazine';


export class FindByIdMagazine {
    constructor(private magazineRepository: MagazineRepository) {}

    async execute(id: string): Promise<Magazine> {
        const magazine = await this.magazineRepository.findById(id);
        
        if(!magazine) {
            throw new Error('magazine not found');
        }

        return magazine;
    }
}