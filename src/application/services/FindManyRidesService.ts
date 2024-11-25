import { CustomerNotFoundError } from "../../domain/errors/CustomerNotFoundError";
import { DriverNotFoundError } from "../../domain/errors/DriverNotFoundError";
import { NoRidesRoundError } from "../../domain/errors/NoRidesRoundsError";
import { DriverRepository } from "../../infra/repository/DriverRepository";
import { CustomerFactory } from "../gateway/CustomerFactory";
import { DriverFactory } from "../gateway/DriverFactory";
import { RideFactory, RideProps } from "../gateway/RideFactory";

interface FindManyRequest {
    customerId: string
    driverId?: string
}

interface FindManyResponse {
    ride: RideProps[]
}

export class FindManyRidesService {

    constructor(
        private rideRepository: RideFactory,
        private customerRepository: CustomerFactory,
        private driverRepository: DriverFactory
    ) {}

    async execute(data: FindManyRequest): Promise<FindManyResponse> {
        let findDriverById;

        let findCustomerById = await this.customerRepository.findById(data.customerId)

        if(!findCustomerById) throw new CustomerNotFoundError()

        if(data.driverId) {
            findDriverById = await this.driverRepository.findById(data.driverId)

            if(!findDriverById) throw new DriverNotFoundError()
        }

        const findRideById = await this.rideRepository.findManyFilteredByDriverIdOptinal(
            data.customerId,
            data.driverId
        )

        if(findRideById.length === 0) throw new NoRidesRoundError()

        console.log(findRideById)

        return {
            ride: findRideById,
        }
    }
}