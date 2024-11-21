import { Ride } from "../../domain/Ride";
import { GoogleMapsRepository } from "../../infra/repository/GoogleMapsRepository";

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
        // rideRepository: RideRepository,
        private googleRepository: GoogleMapsRepository
    ) {}

    async execute(data: CreateRideRequest): Promise<CreateRideResponse> {
       const trip = await this.googleRepository.callComputesRoutes(data.origin, data.destination)
        const distance = trip.routes[0].distanceMeters
        const duration = trip.routes[0].duration?.seconds
        const durationToNumber = Number(duration)

       
       const ride = new Ride(
        new Date(),
        data.origin,
        data.destination,
        distance,
        durationToNumber,
        10,
        data.customerId,
        data.customerId
       )

       return {
        ride
       }
    }
}