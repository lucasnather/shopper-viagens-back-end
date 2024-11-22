import { ConfirmRideService } from "../../application/services/ConfirmRideService"
import { DriverMapper } from "../gateway/DriverMapper"
import { RideMapper } from "../gateway/RideMapper"
import { DriverRepository } from "../repository/DriverRepository"
import { RideRepository } from "../repository/RideRepository"

export class MakeConfirmRideFactory {

    static factory() {
        const rideMapper = new RideMapper()
        const driverMapper = new DriverMapper()
        const rideRepository = new RideRepository(rideMapper)
        const driverRepository = new DriverRepository(driverMapper)
        return new ConfirmRideService(rideRepository, driverRepository)
    }
}