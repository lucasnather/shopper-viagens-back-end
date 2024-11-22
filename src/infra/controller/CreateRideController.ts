import type { Request, Response } from 'express'
import { z, ZodError } from "zod";
import { CreateRideService } from "../../application/services/CreateRideService";
import { InvalidDataError } from '../../domain/errors/invalid-data';
import { CustomerMapper } from '../gateway/CustomerMapper';
import { DriverMapper } from '../gateway/DriverMapper';
import { CustomerRepository } from '../repository/CustomerRepository';
import { DriverRepository } from '../repository/DriverRepository';
import { GoogleMapsRepository } from "../repository/GoogleMapsRepository";

const createRideBodySchema = z.object({
    customer_id: z.string().uuid(),
    origin: z.string(),
    destination: z.string()
})

export class CreateRideController {

    async create(req: Request, res: Response) {
        
        try {
            const { customer_id, destination, origin } = createRideBodySchema.parse(req.body)

            const customerMapper = new CustomerMapper()
            const driverMapper = new DriverMapper()
            const customerRepository = new CustomerRepository(customerMapper)
            const driverRepository = new DriverRepository(driverMapper)
            const googleRepository = new GoogleMapsRepository()
            const createRideService = new CreateRideService(customerRepository, driverRepository, googleRepository)

            const { responseData } = await createRideService.execute({
                customerId: customer_id,
                destination,
                origin
            })

            console.log(responseData)

            return res.json(responseData)
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