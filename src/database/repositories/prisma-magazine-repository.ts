import { MagazineRepository } from '../../app/repositories/magazine-repository';
import { PrismaMagazineMapper } from '../mappers/prisma-magazine-mappers';
import {PrismaClient} from '@prisma/client';
import { Magazine } from '../../app/entities/magazine';


export class PrismaMagazineRepository implements MagazineRepository {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async create(magazine: Magazine): Promise<void> {
        const raw = PrismaMagazineMapper.toPrisma(magazine);

        await this.prisma.magazines.create({
            data: raw,
        });
    }

    async getAll(): Promise<Magazine[]> {
        const magazines = await this.prisma.magazines.findMany();

        return magazines.map(PrismaMagazineMapper.toDomain);
    }

    async findById(id: string): Promise<Magazine | null> {
        const magazine = await this.prisma.magazines.findUnique({
            where:{
                id
            }
        });
        if(!magazine) {
            return null;
        }

        return PrismaMagazineMapper.toDomain(magazine);
    }
    async findBySlug(magazineSlug: string): Promise<Magazine | null> {
        const magazine = await this.prisma.magazines.findUnique({
            where:{
                slug: magazineSlug
            }
        });
        if(!magazine) {
            return null;
        }

        return PrismaMagazineMapper.toDomain(magazine);
    }

    async update(magazine: Magazine): Promise<void>{
        const raw =  PrismaMagazineMapper.toPrisma(magazine);
        await this.prisma.magazines.update({
            where: {
                id: raw.id
            },
            data: raw
        });
    }

    async delete(magazineSlug: string): Promise<void> {
        await this.prisma.magazines.delete({
            where:{
                slug: magazineSlug
            }
        });
    }
}