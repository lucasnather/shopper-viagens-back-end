import { Prisma } from "@prisma/client";
import { Ride } from "../../domain/Ride";


export interface RideProps {
    id: number,
    date: Date,
    distance: number,
    duration: number,
    value: number,
    destination: string,
    origin: string,  
    driverName: string     
}


export interface RideFactory {
    create(ride: Prisma.RideUncheckedCreateInput):Promise<Ride>
    findById(rideId: number): Promise<Ride | null>
    findManyFilteredByDriverIdOptinal(customerId: string, driverId?: string): Promise<RideProps[]>
}