import { FindManyService } from "../../application/services/FindManyRidesService"
import { DriverMapper } from "../gateway/DriverMapper"
import { RideMapper } from "../gateway/RideMapper"
import { DriverRepository } from "../repository/DriverRepository"
import { RideRepository } from "../repository/RideRepository"

export class MakeFindManyRidesFactory {

    static factory() {
        const rideMapper = new RideMapper()
        const driverMapper = new DriverMapper()
        const driverRepository = new DriverRepository(driverMapper)
        const rideRepository = new RideRepository(rideMapper)
        return new FindManyService(rideRepository, driverRepository)
    }
}