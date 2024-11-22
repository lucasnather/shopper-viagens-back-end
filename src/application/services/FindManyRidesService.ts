import { Ride } from "../../domain/Ride";
import { RideRepository } from "../../infra/repository/RideRepository";

interface FindManyRequest {
    customerId: string
    driverId?: string
}

interface FindManyResponse {
    ride: Ride[]
}

export class FindManyService {

    constructor(
        private rideRepository: RideRepository,
    ) {}

    async execute(data: FindManyRequest): Promise<FindManyResponse> {
        const findDriverById = await this.rideRepository.findManyFilteredByDriverIdOptinal(
            data.customerId,
            data.driverId
        )

        if(findDriverById.length === 0) throw new Error("Ride Not Found")


        return {
            ride: findDriverById
        }
    }
}