import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { Ride } from "../../domain/Ride";


export class RideMapper {

    toDomain(ride: Prisma.RideUncheckedCreateInput): Ride {
        const customerId = ride.customerId ||  randomUUID()
        const driverId = ride.driverId ||  randomUUID() 

        return new Ride(
            new Date(ride.date),
            ride.origin,
            ride.destination,
            ride.distance,
            ride.duration,
            Number(ride.value),
            customerId,
            driverId
        )
    }

    toPrisma(ride: Ride) {
        return {
            id: ride.getId,
            date: ride.getDate,
            origin: ride.getOrigin,
            destination: ride.getDestination,
            distance: ride.getDistance,
            duration: ride.getDuration,
            value: ride.getValue,
            customerId: ride.getCustomerId,
            driverId: ride.getDriverId
        }
    }
}