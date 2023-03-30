import Admin from '../../app/entities/admin';
import { admin as RawAdmin} from '@prisma/client';



export default class PrismaAdminMapper {
    static toPrisma(admin: Admin) {
        return {
            id: admin.id,
            username: admin.username,
            password: admin.password
        };
    }

    static toDomain(raw: RawAdmin): Admin {
        return new Admin(
            {
                username: raw.username,
                password: raw.password
            },
            raw.id
        );
    }
}