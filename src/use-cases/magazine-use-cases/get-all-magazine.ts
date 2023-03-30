import { MagazineRepository } from '../../app/repositories/magazine-repository';
import { Magazine } from '../../app/entities/magazine';


export class GetAllMagazine {
    constructor(private magazineRepository: MagazineRepository) {}
    
    async execute(): Promise<Magazine[]> {
        const allMagazines = await this.magazineRepository.getAll();

        return allMagazines;
    }
}