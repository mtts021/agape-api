import { LessonRepository } from '../../app/repositories/lesson-repository';
import PrismaLessonsMapper from '../mappers/prisma-lesson-mappers';
import {PrismaClient} from '@prisma/client';
import { Lesson } from '../../app/entities/lesson';


export class PrismaLessonRepository implements LessonRepository {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async create(lesson: Lesson): Promise<void> {
        const raw = PrismaLessonsMapper.toPrisma(lesson);
        console.log(raw);
        await this.prisma.lessons.create({
            data: raw
        });
    }

    async getAll(magazineSlug: string): Promise<Lesson[]> {
        const lessons = await this.prisma.lessons.findMany(
            {
                where: {
                    magazinesSlug: magazineSlug
                }
            }
        );

        return lessons.map(PrismaLessonsMapper.toDomain);
    }

    async findById(id: string): Promise<Lesson | null> {
        const lesson = await this.prisma.lessons.findUnique({
            where:{
                id
            }
        });
        if(!lesson) {
            return null;
        }

        return PrismaLessonsMapper.toDomain(lesson);
    }
    async findBySlug(magazienSlug: string, lessonSlug: string): Promise<Lesson | null> {
        const lesson = await this.prisma.lessons.findFirst({
            where:{
                magazinesSlug: magazienSlug,
                slug: lessonSlug
            }
        });
        if(!lesson) {
            return null;
        }

        return PrismaLessonsMapper.toDomain(lesson);
    }

    async update(lesson: Lesson): Promise<void>{
        const raw =  PrismaLessonsMapper.toPrisma(lesson);
        await this.prisma.lessons.update({
            where: {
                id: raw.id
            },
            data: raw
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.lessons.delete({
            where:{
                id
            }
        });
    }
}