import { describe, expect, it } from 'vitest';
import InMemoryAdminRepository from '../../../test/in-memory-repository/in-memory-admin';
import CreateAdmin from './create-admin';
import { FindByIdAdmin } from './find-by-id-admin';


describe('Find By Id Admin', ()=> {
    const adminRepository = new InMemoryAdminRepository();
    const createAdmin = new CreateAdmin(adminRepository);
    const findByIdAdmin = new FindByIdAdmin(adminRepository);
    
    it('should be able to find a admin by id', async()=> {
        const admin =  await createAdmin.execute({
            username: 'Admin',
            password: 'd8748428baf7a810bc27742dcbf0295f'
        });
        
        await createAdmin.execute({
            username: 'Admin',
            password: 'd8748428baf7a810bc27742dcbf0295f'
        });

        const lessonOne = await findByIdAdmin.execute(admin.id);
        expect(lessonOne).toEqual(admin);
    });
    it('should not be able to find by slug a non existing admin', async()=> {
        await createAdmin.execute({
            username: 'Admin',
            password: 'd8748428baf7a810bc27742dcbf0295f'
        });

        expect(async ()=> {
            await findByIdAdmin.execute('fake-id');
        }).toThrowError;

    });
});