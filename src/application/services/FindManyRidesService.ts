import { DriverNotFoundError } from "../../domain/errors/DriverNotFoundError";
import { NoRidesRoundError } from "../../domain/errors/NoRidesRoundsError";
import { Ride } from "../../domain/Ride";
import { DriverRepository } from "../../infra/repository/DriverRepository";
import { RideFactory } from "../gateway/RideFactory";

interface FindManyRequest {
    customerId: string
    driverId?: string
}

interface FindManyResponse {
    ride: Ride[]
}

export class FindManyRidesService {

    constructor(
        private rideRepository: RideFactory,
        private driverRepository: DriverRepository
    ) {}

    async execute(data: FindManyRequest): Promise<FindManyResponse> {
        let findDriverById;

        if(data.driverId) {
            findDriverById = await this.driverRepository.findById(data.driverId)

            if(!findDriverById) throw new DriverNotFoundError()
        }

        const findRideById = await this.rideRepository.findManyFilteredByDriverIdOptinal(
            data.customerId,
            data.driverId
        )

        if(findRideById.length === 0) throw new NoRidesRoundError()

        return {
            ride: findRideById
        }
    }
}