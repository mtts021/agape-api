import Admin from '../../app/entities/admin';
import AdminRepository from '../../app/repositories/admin-repository';

export class FindByUsernameAndPassword {
    constructor(private adminRepository: AdminRepository) {}

    async execute(username: string, password: string): Promise<Admin | null> {
        const admin = await this.adminRepository.findByUsernameAndPassword(username, password);

        if(!admin){
            throw new Error('admin not found');
        }
        return admin;
    }
}