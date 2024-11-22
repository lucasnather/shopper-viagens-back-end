import type { Request, Response } from 'express'
import { z, ZodError } from "zod";
import { DriverNotFoundError } from '../../domain/errors/DriverNotFoundError';
import { InvalidMilageToDriveError } from '../../domain/errors/InvalidMilageToDriverError';
import { MakeConfirmRideFactory } from '../factory/MakeConfirmRideFactory';

const confirmRideBodySchema = z.object({
    customer_id: z.string().uuid(),
    origin: z.string(),
    destination: z.string(),
    distance: z.number(),
    duration: z.number(),
    value: z.number(),
    driver: z.object({
        id: z.string(),
        name: z.string(),
    })
})

export class ConfirmRideController {

    async confirm(req: Request, res: Response) {
        
        try {
            const { customer_id, destination, distance, driver, duration, origin, value } = confirmRideBodySchema.parse(req.body)

            const confirmRideService = MakeConfirmRideFactory.factory()

            await confirmRideService.execute({
                customerId: customer_id,
                destination,
                origin,
                distance,
                value,
                duration,
                driver
            })

            return res.json({
                success: true
            })
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
            if(e instanceof InvalidMilageToDriveError) {
                res.json({
                    "error_code": e.name,
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

