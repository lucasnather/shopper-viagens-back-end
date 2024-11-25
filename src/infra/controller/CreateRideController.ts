import type { Request, Response } from 'express'
import { z, ZodError } from "zod";
import { InvalidDataError } from '../../domain/errors/InvalidDataError';
import { MakeCreateRideFactory } from '../factory/MakeCreateRideFactory';

const createRideBodySchema = z.object({
    customer_id: z.string().uuid(),
    origin: z.string(),
    destination: z.string()
})

export class CreateRideController {

    async create(req: Request, res: Response) {
        
        try {
            const { customer_id, destination, origin } = createRideBodySchema.parse(req.body)

           const createRideService = MakeCreateRideFactory.factory()

            const { responseData } = await createRideService.execute({
                customerId: customer_id,
                destination,
                origin
            })

            return res.json(responseData)
        } catch(e) {
            if(e instanceof ZodError || e instanceof InvalidDataError) {
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