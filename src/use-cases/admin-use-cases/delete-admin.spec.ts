import InMemoryAdminRepository from '../../../test/in-memory-repository/in-memory-admin';
import { expect, test } from 'vitest';
import CreateAdmin from './create-admin';
import DeleteAdmin from './delete-admin';

test('should be able to delete of a lesson', async ()=> {
    const adminRepository = new InMemoryAdminRepository();
    const deleteAdmin = new DeleteAdmin(adminRepository);
    const createAdmin = new CreateAdmin(adminRepository);

    const admin = await createAdmin.execute({
        username: 'Jonh Doe',
        password: 'd8748428baf7a810bc27742dcbf0295f'
    });

    await deleteAdmin.execute(admin.id);

    expect(adminRepository.admin).toHaveLength(0);
});