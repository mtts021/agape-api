import Admin from '../../app/entities/admin';
import AdminRepository from '../../app/repositories/admin-repository';
import bcrypt from 'bcrypt';

interface CreateAdminRequest {
    username: string
    password: string
}

export default class CreateAdmin {
    constructor(private adminRepository: AdminRepository) {}

    async execute(request: CreateAdminRequest): Promise<Admin> {
        const {username, password} = request;
        const passwordHash = await bcrypt.hash(password, 8);
        const admin = new Admin({
            username,
            password: passwordHash
        });

        await this.adminRepository.create(admin);
        return admin;
    }
}