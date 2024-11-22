import { DriverNotFoundError } from "../../domain/errors/DriverNotFoundError";
import { InvalidMilageToDriveError } from "../../domain/errors/InvalidMilageToDriverError";
import { Ride } from "../../domain/Ride";
import { DriverFactory } from "../gateway/DriverFactory";
import { RideFactory } from "../gateway/RideFactory";

interface ConfirmRideRequest {
    customerId: string
    origin: string
    destination: string
    distance: number
    duration: number
    driver: Driver
    value: number
}

interface Driver {
    id: string
    name: string
}

interface ConfirmRideResponse {
    ride: Ride
}

export class ConfirmRideService {

    constructor(
        private rideRepository: RideFactory,
        private driverRepository: DriverFactory
    ) {}

    async execute(data: ConfirmRideRequest): Promise<ConfirmRideResponse> {
        const findDriverById = await this.driverRepository.findById(data.driver.id)

        if(!findDriverById) throw new DriverNotFoundError()

        if(data.distance < findDriverById.getMilage)  throw new InvalidMilageToDriveError()

        const ride = await this.rideRepository.create({
            customerId: data.customerId,
            date: new Date(),
            distance: data.distance,
            duration: data.duration,
            value: data.value,
            driverId: data.driver.id,
            origin: data.origin,
            destination: data.destination
        })

        return {
            ride
        }
    }
}