import Admin from '../../app/entities/admin';
import AdminRepository from '../../app/repositories/admin-repository';


export class FindByIdAdmin {
    constructor(private adminRepository: AdminRepository) {}

    async execute(id: string): Promise<Admin | null> {
        const admin = await this.adminRepository.findById(id);
        if(!admin){
            throw new Error('admin not found');
        }
        
        return admin;
    }
}