import type { Request, Response } from 'express'
import { MakeFindManyCustomersFactory } from '../factory/MakeFindManyCustomers';

export class FindManyCustomersController {

    async findMany(req: Request, res: Response) {
        
        const findManyCustomersService = MakeFindManyCustomersFactory.factory()

        const { customers } = await findManyCustomersService.execute()

        return res.json(customers)
    }
}

