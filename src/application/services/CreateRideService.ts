import { Ride } from "@prisma/client";
import { GoogleMapsRepository } from "../../infra/repository/GoogleMapsRepository";
import { RideRepository } from "../../infra/repository/RideRepository";

interface CreateRideRequest {
    customerId: string,
    origin: string,
    destination: string
}

interface CreateRideResponse {
    ride: Ride | null
}

export class CreateRideService {

    constructor(
        private rideRepository: RideRepository,
        private googleRepository: GoogleMapsRepository
    ) {}

    async execute(data: CreateRideRequest): Promise<CreateRideResponse> {
        const tripData = await this.googleRepository.callComputesRoutes(data.origin, data.destination)

       console.log(tripData)

       return {
        ride: null
       }
    }
}