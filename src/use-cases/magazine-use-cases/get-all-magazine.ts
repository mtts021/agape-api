import { MagazineRepository } from '../../app/repositories/magazine-repository';
import { Magazine } from '../../app/entities/magazine';


export class GetAllMagazine {
    constructor(private magazineRepository: MagazineRepository) {}
    
    async execute(): Promise<Magazine[]> {
        const allMagazines = await this.magazineRepository.getAll();
        if(allMagazines.length <= 0) {
            throw new Error('no magazine registers');
        }
        return allMagazines;
    }
}