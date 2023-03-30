import { describe, it, expect } from 'vitest';
import InMemoryAdminRepository from '../../../test/in-memory-repository/in-memory-admin';
import CreateAdmin from './create-admin';
import { FindByUsernameAndPassword} from './find-by-username-password';


describe('Find by username and password', ()=> {
    it('should be able to get a admin by username e password', async()=> {
        const adminRepository = new InMemoryAdminRepository();
        const createAdmin = new CreateAdmin(adminRepository);
        const findByUsernameAndPassword = new FindByUsernameAndPassword(adminRepository);
        const admin =  await createAdmin.execute({
            username: 'Admin',
            password: 'd8748428baf7a810bc27742dcbf0295f'
        });
        
        const adminOne = await findByUsernameAndPassword.execute(admin.username, admin.password);
        expect(adminOne).toEqual(admin);
    });

    it('should not be able to find a admin with incorrect password', async ()=> {
        const adminRepository = new InMemoryAdminRepository();
        const createAdmin = new CreateAdmin(adminRepository);
        const findByUsernameAndPassword = new FindByUsernameAndPassword(adminRepository);
        const admin =  await createAdmin.execute({
            username: 'Admin',
            password: 'd8748428baf7a810bc27742dcbf0295f'
        });
        
        await expect(findByUsernameAndPassword.execute(admin.username, 'example-password-fake')).rejects.toThrowError();
    });
    it('should not be able to find a admin with incorrect username', async()=> {
        const adminRepository = new InMemoryAdminRepository();
        const createAdmin = new CreateAdmin(adminRepository);
        const findByUsernameAndPassword = new FindByUsernameAndPassword(adminRepository);
        const admin =  await createAdmin.execute({
            username: 'Admin',
            password: 'd8748428baf7a810bc27742dcbf0295f'
        });
        
        
        await expect(findByUsernameAndPassword.execute('example-username-fake', admin.password)).rejects.toThrowError();
    });
    
});