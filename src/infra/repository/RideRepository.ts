import { Prisma } from "@prisma/client";
import { RideFactory, RideProps } from "../../application/gateway/RideFactory";
import { prisma } from "../../database/prisma";
import { Ride } from "../../domain/Ride";
import { RideMapper } from "../gateway/RideMapper";

export class RideRepository implements RideFactory {

    constructor( private rideMapper: RideMapper ) {}

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

    async findManyFilteredByDriverIdOptinal(customerId: string, driverId?: string): Promise<RideProps[]> {
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
            },
            select: {
                id: true,
                date: true,
                customerId: true,
                driverId: true,
                destination: true,
                origin: true,
                value: true,
                distance: true,
                duration: true,
                driver: {
                    select: {
                        name: true
                    } 
                }
            }
        })

        return findManyRides.map(rides => {
            const ride = this.rideMapper.toDomain(rides)

            return {
                id: ride.getId,
                date: ride.getDate,
                distance: ride.getDistance,
                duration: ride.getDuration,
                value: ride.getValue,
                destination: ride.getDestination,
                origin: ride.getOrigin,  
                driverName: rides.driver.name 
            }
        })
    }

}