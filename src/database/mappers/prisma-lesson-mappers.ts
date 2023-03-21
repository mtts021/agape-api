import { Lesson } from '../../app/entities/lesson';
import { lessons as RawLessons} from '@prisma/client';

export default class PrismaLessonsMapper {
    static toPrisma(lesson: Lesson) {
        return {
            id: lesson.id,
            theme: lesson.theme,
            slug: lesson.slug,
            mainText: lesson.mainText,
            bibleText: lesson.bibleText,
            content: lesson.content,
            createdAt: lesson.createdAt,
            updatedAt: lesson.updatedAt,
            magazinesSlug: lesson.magazineSlug
        };
    }

    static toDomain(raw: RawLessons): Lesson {
        return new Lesson(
            {
                theme: raw.theme,
                mainText: raw.mainText,
                bibleText: raw.bibleText,
                content: raw.content,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt,
                magazineSlug: raw.magazinesSlug
            },
            raw.id,
            raw.slug
        );
    }
}