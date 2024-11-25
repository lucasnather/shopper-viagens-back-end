import { FindManyRidesService } from "../../application/services/FindManyRidesService"
import { CustomerMapper } from "../gateway/CustomerMapper"
import { DriverMapper } from "../gateway/DriverMapper"
import { RideMapper } from "../gateway/RideMapper"
import { CustomerRepository } from "../repository/CustomerRepository"
import { DriverRepository } from "../repository/DriverRepository"
import { RideRepository } from "../repository/RideRepository"

export class MakeFindManyRidesFactory {

    static factory() {
        const rideMapper = new RideMapper()
        const driverMapper = new DriverMapper()
        const customerrMapper = new CustomerMapper()
        const driverRepository = new DriverRepository(driverMapper)
        const customerRepository = new CustomerRepository(customerrMapper)
        const rideRepository = new RideRepository(rideMapper)
        return new FindManyRidesService(rideRepository, customerRepository , driverRepository)
    }
}