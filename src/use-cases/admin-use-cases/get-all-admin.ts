import Admin from '../../app/entities/admin';
import AdminRepository from '../../app/repositories/admin-repository';


export default class GetAllAdmin {
    constructor(private adminRepository: AdminRepository) {} 

    async execute(): Promise<Admin[]> {
        const admin = await this.adminRepository.getAll();
        return admin;
    }
}