import InMemoryAdminRepository from '../../../test/in-memory-repository/in-memory-admin';
import { describe, expect, it } from 'vitest';
import CreateAdmin from './create-admin';
import GetAdmin from './get-all-admin';

describe('Get Admin', ()=> {
    it('should be able to get all admin', async()=> {
        const adminRepository = new InMemoryAdminRepository();
        const createAdmin = new CreateAdmin(adminRepository);
        const getAdmin = new GetAdmin(adminRepository);

        await createAdmin.execute({
            username: 'Admin',
            password: 'd8748428baf7a810bc27742dcbf0295f'
        });

        const admin = await createAdmin.execute({
            username: 'Admin',
            password: 'd8748428baf7a810bc27742dcbf0295f'
        });

        const admins = await getAdmin.execute();

        expect(admins).toHaveLength(2);
        expect(admins[1]).toEqual(admin);
    });

});