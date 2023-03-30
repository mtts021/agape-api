import { expect, test } from 'vitest';
import InMemoryAdminRepository from '../../../test/in-memory-repository/in-memory-admin';
import CreateAdmin from './create-admin';
import { FindByIdAdmin } from './find-by-id-admin';
import UpdateAdmin from './update-admin';


test('should be able to update of a Admin', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const createAdmin = new CreateAdmin(adminRepository);
    const updateAdmin = new UpdateAdmin(adminRepository);
    const findByIdAdmin = new FindByIdAdmin(adminRepository);

    const admin = await createAdmin.execute({
        username: 'Jonh Doe',
        password: 'd8748428baf7a810bc27742dcbf0295f'
    });
    const {id} = admin;

    await updateAdmin.execute({
        id,
        password: 'test_password'
    });
    const adminOne = await findByIdAdmin.execute(id);
    expect(adminOne?.updatedAt).toBeInstanceOf(Date);
    
});