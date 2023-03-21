import { Magazine } from '../../app/entities/magazine';
import { magazines as RawMagazines } from '@prisma/client';

export class PrismaMagazineMapper {
    static toPrisma(magazine: Magazine) {
        return {
            id: magazine.id,
            theme: magazine.theme,
            descriptionTheme: magazine.descriptionTheme,
            slug: magazine.slug,
            quarter: magazine.quarter,
            year: magazine.year,
            ageGroup: magazine.ageGroup,
            createdAt: magazine.createdAt,
            updatedAt: magazine.updatedAt
        };
    }

    static toDomain(raw: RawMagazines): Magazine {
        return new Magazine(
            {
                theme: raw.theme,
                descriptionTheme: raw.descriptionTheme,
                quarter: raw.quarter,
                year: raw.year,
                ageGroup: raw.ageGroup,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt
            },
            raw.id,
            raw.slug
        );
    }
}