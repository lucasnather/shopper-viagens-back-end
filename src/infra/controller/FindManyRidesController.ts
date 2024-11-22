import type { Request, Response } from 'express'
import { z, ZodError } from "zod";
import { InvalidDataError } from '../../domain/errors/invalid-data';
import { DriverMapper } from '../gateway/DriverMapper';
import { RideMapper } from "../gateway/RideMapper";
import { DriverRepository } from '../repository/DriverRepository';
import { RideRepository } from "../repository/RideRepository";
import { ConfirmRideService } from "../../application/services/ConfirmRideService"
import { FindManyService } from '../../application/services/FindManyRidesService';

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
            console.log(driver_id)

            const rideMapper = new RideMapper()
            const rideRepository = new RideRepository(rideMapper)
            const findManyRidesService = new FindManyService(rideRepository)

            const { ride } = await findManyRidesService.execute({
                customerId: customer_id,
                driverId: driver_id
            })

            return res.json(ride)
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

