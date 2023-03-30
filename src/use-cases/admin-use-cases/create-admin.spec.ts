import { describe, expect, it } from 'vitest';
import InMemoryAdminRepository from '../../../test/in-memory-repository/in-memory-admin';
import CreateAdmin from './create-admin';

describe('Create Lessons', ()=> {
    it('should be able to create a Lessons', async ()=> {
        const adminRepository = new InMemoryAdminRepository;
        const createAdmin = new CreateAdmin(adminRepository);

        const admin = await createAdmin.execute({
            username: 'Admin',
            password: 'd8748428baf7a810bc27742dcbf0295f'
        });
        expect(adminRepository.admin).toHaveLength(1);
        expect(adminRepository.admin[0]).toEqual(admin);
    });
});