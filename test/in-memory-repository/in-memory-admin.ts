import Admin from '../../src/app/entities/admin';
import AdminRepository from '../../src/app/repositories/admin-repository';


export default class InMemoryAdminRepository implements AdminRepository {
    public admin: Admin[] = [];
    
    async create(admin: Admin): Promise<void> {
        this.admin.push(admin);
    }
    
    async getAll(): Promise<Admin[]> {
        return this.admin;
    }
    async findById(id: string): Promise<Admin | null> {
        const admin =  this.admin.find(admin => admin.id == id);
        
        if(!admin){
            return null;
        }
        
        return admin;
    }
    async findByUsernameAndPassword(username: string, password: string): Promise<Admin | null> {
        const admin =  this.admin.find(admin => admin.username == username && admin.password == password);
        if(!admin){
            return null;
        } 
        
        return admin;
    }
    
    async update(admin: Admin): Promise<void> {
        const adminOne =  this.admin.find(item => item.id == admin.id);

        if(!adminOne) {
            throw new Error('admin not found');
        }
        
        const index = this.admin.indexOf(adminOne);
        this.admin[index] = admin;
    }

    async delete(id: string): Promise<void> {
        const admin =  this.admin.find(admin => admin.id == id);
        if(!admin){
            throw new Error('admin not found');
        }
     
        const index = this.admin.indexOf(admin);

        if(index < 0){
            throw new Error('index not found');
        }

        this.admin.splice(index, 1);
    }
}