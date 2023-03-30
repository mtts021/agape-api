import AdminRepository from '../../app/repositories/admin-repository';
import bcrypt from 'bcrypt';
import PrismaAdminMapper from '../mappers/prisma-admin-mappers';
import {PrismaClient} from '@prisma/client';
import Admin from '../../app/entities/admin';


export default class PrismaAdminRepository implements AdminRepository {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async create(admin: Admin): Promise<void> {
        const raw = PrismaAdminMapper.toPrisma(admin);

        await this.prisma.admin.create({
            data: raw,
        });
    }

    async getAll(): Promise<Admin[]> {
        const adimn = await this.prisma.admin.findMany({});

        return adimn.map(PrismaAdminMapper.toDomain);
    }

    async findById(id: string): Promise<Admin | null> {
        const admin = await this.prisma.admin.findUnique({
            where:{
                id
            }
        });
        if(!admin) {
            return null;
        }

        return PrismaAdminMapper.toDomain(admin);
    }
    async findByUsernameAndPassword(username: string ,password: string): Promise<Admin | null> {
        const admin = await this.prisma.admin.findFirst({
            where: {
                username,
                password
            },
        });
        if(!admin) {
            return null;
        }

        return PrismaAdminMapper.toDomain(admin);
    }

    async update(adimn: Admin): Promise<void>{
        const raw =  PrismaAdminMapper.toPrisma(adimn);
        await this.prisma.admin.update({
            where: {
                id: raw.id
            },
            data: raw
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.admin.delete({
            where:{
                id
            }
        });
    }
}