import Admin from '../../app/entities/admin';
import AdminRepository from '../../app/repositories/admin-repository';

interface UpdateAdminRequest {
    id: string
    username?: string
    password?: string
}

export default class UpdateAdmin {
    constructor(private AdminRepository: AdminRepository ) {}

    async execute(request: UpdateAdminRequest): Promise<Admin> {
        const {id, username, password} = request;
        const admin = await this.AdminRepository.findById(id);
        if(!admin) {
            throw new Error('Admin not found.');
        }

        if(username) {
            admin.username = username; 
        }

        if(password) {
            admin.password = password;
        }

        admin.update();
        await this.AdminRepository.update(admin);

        return admin;
    }
}