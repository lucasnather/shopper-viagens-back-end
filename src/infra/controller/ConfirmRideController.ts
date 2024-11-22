import type { Request, Response } from 'express'
import { z, ZodError } from "zod";
import { InvalidDataError } from '../../domain/errors/invalid-data';
import { DriverMapper } from '../gateway/DriverMapper';
import { RideMapper } from "../gateway/RideMapper";
import { DriverRepository } from '../repository/DriverRepository';
import { RideRepository } from "../repository/RideRepository";
import { ConfirmRideService } from "../../application/services/ConfirmRideService"

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

            const rideMapper = new RideMapper()
            const driverMapper = new DriverMapper()
            const rideRepository = new RideRepository(rideMapper)
            const driverRepository = new DriverRepository(driverMapper)
            const confirmRideService = new ConfirmRideService(rideRepository, driverRepository)

            const { ride } = await confirmRideService.execute({
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
            if(e instanceof ZodError || e instanceof InvalidDataError) {
                res.json({
                    "error_code": "INVALID_DATA",
                    "error_description": e.message
                })
            }

            return res.json({
                message: "Server Internal error"
            })
        }
    }
}

