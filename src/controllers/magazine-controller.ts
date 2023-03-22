import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';
import { PrismaMagazineRepository } from '../database/repositories/prisma-magazine-repository';
import { CreateMagazine } from '../use-cases/magazine-use-cases/create-magazine';
import { DeleteMagazine } from '../use-cases/magazine-use-cases/delete-magazine';
import { GetAllMagazine } from '../use-cases/magazine-use-cases/get-all-magazine';
import { UpdateMagazine } from '../use-cases/magazine-use-cases/update-magazine';
import { FindBySlugMagazine } from '../use-cases/magazine-use-cases/find-by-slug-magazine';


export class MagazineController {
    async create(req: Request, res: Response, next: NextFunction ) {
        const magazineRepository = new PrismaMagazineRepository();
        const createMagazine = new CreateMagazine(magazineRepository);
        const schema = Yup.object().shape({
            theme: Yup.string().required().min(10),
            descriptionTheme: Yup.string().required().min(20),
            quarter: Yup.string().required(),
            year: Yup.string().required(),
            ageGroup: Yup.string().required()
        });
        try {
            await schema.validate(req.body);
        } catch (error) {
            const yupError = error as Yup.ValidationError;
            return res.status(400).json({
                error: yupError.message
            });
        }
        const {theme, descriptionTheme, quarter, year, ageGroup} = req.body;
        try {
            const magazine = await createMagazine.execute({
                theme,
                descriptionTheme,
                quarter,
                year,
                ageGroup
            });
            return res.status(201).json(magazine);
        } catch (error) {
            next(error);
        }
        
    }

    async getAll(req: Request, res: Response, next: NextFunction ) {
        const magazineRepository = new PrismaMagazineRepository();
        const getAllMagazine = new GetAllMagazine(magazineRepository);
        try {
            const magazine = await getAllMagazine.execute();
            return res.status(200).json(magazine);
        } catch (error) {
            next(error);
        }
    }

    async findBySlug(req: Request<{slug: string}>, res: Response, next: NextFunction ) {
        const magazineRepository = new PrismaMagazineRepository();
        const findBySlugMagazine = new FindBySlugMagazine(magazineRepository);
        const {slug} = req.params;
        try {
            const magazine = await findBySlugMagazine.execute(slug);
            return res.status(200).json(magazine);
            
        } catch (error) {
            next(error);
        }
    }
    
    async update(req: Request<{magazineSlug: string}>, res: Response, next: NextFunction ) {
        const magazineRepository = new PrismaMagazineRepository();
        const updateMagazine = new UpdateMagazine(magazineRepository);
        const {magazineSlug} = req.params;
        if(!req.body) {
            return res.status(400).json({'Error': 'No fields were provided'});
        }
        try {
            const magazine = await updateMagazine.execute({magazineSlug, ...req.body});
            return res.status(200).json(magazine);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request<{magazineSlug: string}>, res: Response, next: NextFunction ) {
        const magazineRepository = new PrismaMagazineRepository();
        const deleteMagazine = new DeleteMagazine(magazineRepository);

        try {
            await deleteMagazine.execute(req.params.magazineSlug);
            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    
    }
}