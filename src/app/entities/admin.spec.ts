import { expect, test } from 'vitest';
import Admin from './admin';


test('should be able to create Admin', () => {
    const admin = new Admin({
        username: 'Admin',
        password: 'd8748428baf7a810bc27742dcbf0295f'
    });

    expect(admin).toBeInstanceOf(Admin);
});