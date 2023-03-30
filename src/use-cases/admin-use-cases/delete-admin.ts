import AdminRepository from '../../app/repositories/admin-repository';

export default class DeleteAdmin {
    constructor(private adminRepository: AdminRepository){}

    async execute(id: string): Promise<void> {
        const admin = await this.adminRepository.findById(id);
        if(!admin) {
            throw new Error('Admin not found');
        }

        this.adminRepository.delete(id);
    }
}