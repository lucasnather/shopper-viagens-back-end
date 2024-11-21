import type { Request, Response } from 'express'
import { z } from "zod";
import { CreateRideService } from "../../application/services/CreateRideService";
import { RideMapper } from "../gateway/RideMapper";
import { GoogleMapsRepository } from "../repository/GoogleMapsRepository";
import { RideRepository } from "../repository/RideRepository";

const createRideBodySchema = z.object({
    customer_id: z.string().uuid(),
    origin: z.string(),
    destination: z.string()
})

export class CreateRideController {

    async create(req: Request, res: Response) {
        
        try {
            const { customer_id, destination, origin } = createRideBodySchema.parse(req.body)

            const rideMapper = new RideMapper()
            const rideRepository = new RideRepository(rideMapper)
            const googleRepository = new GoogleMapsRepository()
            const createRideService = new CreateRideService(googleRepository)

            const { ride } = await createRideService.execute({
                customerId: customer_id,
                destination,
                origin
            })

            console.log(ride)

            return res.json(ride)
        } catch(e) {
            return res.json({
                message: e
            })
        }
    }
}