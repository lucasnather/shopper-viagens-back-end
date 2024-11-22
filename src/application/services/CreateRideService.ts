import { InvalidDataError } from "../../domain/errors/InvalidDataError";
import { CustomerRepository } from "../../infra/repository/CustomerRepository";
import { DriverRepository } from "../../infra/repository/DriverRepository";
import { GoogleMapsRepository } from "../../infra/repository/GoogleMapsRepository";

interface CreateRideRequest {
    customerId: string,
    origin: string,
    destination: string
}

interface CreateRideResponse {
    responseData: any
}

export class CreateRideService {

    constructor(
        private customerRepository: CustomerRepository,
        private driverRepository: DriverRepository,
        private googleRepository: GoogleMapsRepository
    ) {}

    async execute(data: CreateRideRequest): Promise<CreateRideResponse> {
        if(data.origin === data.destination) throw new InvalidDataError()

        const findCustomerById = await this.customerRepository.findById(data.customerId)

        if(!findCustomerById) throw new Error("Customer Not Found");
   
        const trip = await this.googleRepository.callComputesRoutes(data.origin, data.destination)
        
        const distance = trip.response.routes[0].distanceMeters
        const duration = trip.response.routes[0].duration?.seconds
        const durationToNumber = Number(duration)
        const ditanceToNumber = Number(distance)
        const kilometer = this.meterToKilometer(ditanceToNumber)
        const minute = this.secondsToMinutes(durationToNumber)

        const findDriverByGreaterKm = await this.driverRepository.findBManyByKilometer(kilometer)
        console.log(findDriverByGreaterKm)

        const responseData = {
            origin: trip.origin,
            destination: trip.destination,
            distance: kilometer,
            duration: minute,
            options: {
                findDriverByGreaterKm
            },
            routeResponse: trip.response,
        }

        console.log(responseData)

       return {
        responseData
       }
    }

    private meterToKilometer(meter: number) {
        return meter / 1000
    }

    private secondsToMinutes(duration: number) {
        return Number(Math.ceil((duration / 60)).toFixed(2))
    }
}