import type { Request, Response } from 'express'
import { z, ZodError } from "zod";
import { NoRidesRoundError } from '../../domain/errors/NoRidesRoundsError';
import { DriverNotFoundError } from '../../domain/errors/DriverNotFoundError';
import { MakeFindManyRidesFactory } from '../factory/MakeFindManyRidesFactory';

const findManysRideParamSchema = z.object({
    customer_id: z.string().uuid(),
})

const findManysRideQuerySchema = z.object({
    driver_id: z.string().uuid().optional()
})

export class FindManyRidesController {

    async find(req: Request, res: Response) {
        
        try {
            const { customer_id } = findManysRideParamSchema.parse(req.params)
            const { driver_id } = findManysRideQuerySchema.parse(req.query)

            const findManyRidesService = MakeFindManyRidesFactory.factory()

            const { ride } = await findManyRidesService.execute({
                customerId: customer_id,
                driverId: driver_id
            })

            return res.json(ride)
        } catch(e) {
            if(e instanceof ZodError) {
                res.json({
                    "error_code": "INVALID_DATA",
                    "error_description": e.message
                })
                return
            }

            if(e instanceof DriverNotFoundError) {
                res.json({
                    "error_code": e.name,
                    "error_description": e.message
                })
                return
            }

            if(e instanceof NoRidesRoundError) {
                res.json({
                    "error_code": "INVALID_DATA",
                    "error_description": e.message
                })
                return
            }

            return res.json({
                message: "Server Internal error"
            })
        }
    }
}

