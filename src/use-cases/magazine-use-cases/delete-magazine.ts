import { MagazineRepository } from '../../app/repositories/magazine-repository';

export class DeleteMagazine {
    constructor(private magazineRepository: MagazineRepository){}

    async execute(magazineSlug: string): Promise<void> {
        const magazine = await this.magazineRepository.findBySlug(magazineSlug);
        if(!magazine) {
            throw new Error('magazine not found');
        }

        this.magazineRepository.delete(magazineSlug);
    }
}