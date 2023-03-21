import { Magazine } from '../entities/magazine';

export interface MagazineRepository {
    create(magazine: Magazine): Promise<void>
    getAll(): Promise<Magazine[]>
    findById(id: string): Promise<Magazine | null>
    findBySlug(id: string): Promise<Magazine | null>
    update(magazine: Magazine): Promise<void>
    delete(magazineSlug: string): Promise<void>
}