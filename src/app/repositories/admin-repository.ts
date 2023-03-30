/* eslint-disable semi */
import Admin from '../entities/admin';

export default interface AdminRepository {
    create(lessons: Admin): Promise<void>
    getAll(): Promise<Admin[]>
    findById(id: string): Promise<Admin | null>
    findByUsernameAndPassword(username: string, password: string): Promise<Admin | null>
    update(Admin: Admin): Promise<void>
    delete(id: string): Promise<void>
}