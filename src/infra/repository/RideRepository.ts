import { Prisma } from "@prisma/client";
import { RideFactory } from "../../application/gateway/RideFactory";
import { prisma } from "../../database/prisma";
import { Ride } from "../../domain/Ride";
import { RideMapper } from "../gateway/RideMapper";

export class RideRepository implements RideFactory {

    constructor( private rideMapper: RideMapper ) {}
    
    confirm(customerId: string, driverId: string): Promise<Ride> {
        throw new Error("Method not implemented.");
    }

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
                driverId: ride.driverId,
                confirm: true
            },
        })

        return this.rideMapper.toDomain(createRide)
    }

   
    
    async findById(rideId: number): Promise<Ride | null> {
        const findRideById = await prisma.ride.findFirst({
            where: {
                id: rideId
            }
        })

        if(!findRideById) return null

        return this.rideMapper.toDomain(findRideById)
    }

    async findManyFilteredByDriverIdOptinal(customerId: string, driverId?: string): Promise<Ride[]> {
        const findManyRides = await prisma.ride.findMany({
            where: {
                AND: [
                    {
                        customerId
                    },
                    {
                        driverId
                    }
                ]
            }
        })

        return findManyRides.map(rides => {
            return this.rideMapper.toDomain(rides)
        })
    }

}