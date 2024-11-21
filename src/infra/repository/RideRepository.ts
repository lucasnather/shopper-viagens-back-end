import { Prisma } from "@prisma/client";
import { RideFactory } from "../../application/gateway/RideFactory";
import { prisma } from "../../database/prisma";
import { Ride } from "../../domain/Ride";
import { RideMapper } from "../gateway/RideMapper";

export class RideRepository implements RideFactory {

    constructor( private rideMapper: RideMapper ){}

    async create(ride: Prisma.RideUncheckedCreateInput): Promise<Ride> {
        const createRide = await prisma.ride.create({
            data: {
                date: ride.date,
                distance: ride.distance,
                duration: ride.duration,
                origin: ride.origin,
                destination: ride.destination,
                value: ride.value,
                customerId: ride.customerId,
                driverId: ride.driverId
            },
        })

        return this.rideMapper.toDomain(createRide)
    }

    async confirm(ride: Prisma.RideUpdateInput): Promise<Ride> {
        throw new Error("Method not implemented.");
    }
    
    async findById(rideId: number): Promise<Ride | null> {
        throw new Error("Method not implemented.");
    }

}