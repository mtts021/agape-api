import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup'; 
import PrismaAdminRepository from '../database/repositories/prisma-admin-repository';
import GetAdmin from '../use-cases/admin-use-cases/get-all-admin';
import CreateAdmin from '../use-cases/admin-use-cases/create-admin';
import DeleteAdmin from '../use-cases/admin-use-cases/delete-admin';


class AdminController {
    async getAll(req: Request, res: Response ) {
        const adminRepository = new PrismaAdminRepository();
        const getAdmin = new GetAdmin(adminRepository);
        const admin = await getAdmin.getAll();
        res.status(200).json(admin);
    }

    async findById(req: Request<{id: string}>, res: Response ) {
        const adminRepository = new PrismaAdminRepository();
        const getAdmin = new GetAdmin(adminRepository);
        
        const {id} = req.params;
        const admin = await getAdmin.findById(id);
        if(!admin){
            return res.sendStatus(404);
        }
        res.status(200).json(admin);
    }

    async create(req: Request, res: Response ) {
        const adminRepository = new PrismaAdminRepository();
        const createAdmin = new CreateAdmin(adminRepository);
        const schema = Yup.object().shape({
            username: Yup.string().required(),
            password: Yup.string().required(),
        });
        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Error on validate schema.'});
        }

        try {
            const admin = await createAdmin.execute(req.body);
            return res.status(201).json(admin);
        } catch (error) {
            return res.status(500).json({error: error});
        }
        
    }

    async delete( req: Request<{id: string}>, res: Response, next: NextFunction) {
        const adminRepository = new PrismaAdminRepository();
        const deleteAdmin = new DeleteAdmin(adminRepository);
        try {
            await deleteAdmin.execute(req.params.id);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }

    }
}

export default new AdminController();