import { Prisma } from "@prisma/client";
import { RideFactory, RideProps } from "../../../application/gateway/RideFactory";
import { Ride } from "../../../domain/Ride";

export class InMemoryRideRepository implements RideFactory {

    rides: Ride[] = []

    async create(ride: Prisma.RideUncheckedCreateInput): Promise<Ride> {
        const createRide = new Ride(
            new Date(),
            ride.origin,
            ride.destination,
            ride.distance,
            ride.duration,
            ride.value,
            ride.customerId,
            ride.driverId
        )

        this.rides.push(createRide)

        return createRide
    }

    async findById(rideId: number): Promise<Ride | null> {
        const findRide = this.rides.filter(ride => {
            return ride.getId === rideId
        })

        if(findRide.length === 0) return null

        return findRide[0]
    }

    async findManyFilteredByDriverIdOptinal(customerId: string, driverId?: string | undefined): Promise<RideProps[]> {
        if(driverId) {
            const ride = this.rides.filter(ride => {
                return ride.getCustomerId === customerId && ride.getDriverId === driverId
            })

            return ride.map(r => {
                return {
                    id: r.getId,
                    date: r.getDate,
                    distance: r.getDistance,
                    duration: r.getDuration,
                    value: r.getValue,
                    destination: r.getDestination,
                    origin: r.getOrigin,  
                    driverName: "driver"
                }
            })
        
        } else {
            const ride = this.rides.filter(ride => {
                return ride.getCustomerId === customerId
            })

            return ride.map(r => {
                return {
                    id: r.getId,
                    date: r.getDate,
                    distance: r.getDistance,
                    duration: r.getDuration,
                    value: r.getValue,
                    destination: r.getDestination,
                    origin: r.getOrigin,  
                    driverName: "driver"
                }
            })
        }
       
    }
    
}