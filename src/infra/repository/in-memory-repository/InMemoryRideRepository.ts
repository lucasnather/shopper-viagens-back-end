import { Prisma } from "@prisma/client";
import { RideFactory } from "../../../application/gateway/RideFactory";
import { Ride } from "../../../domain/Ride";

export class InMemoryRideRepository implements RideFactory {

    async create(ride: Prisma.RideUncheckedCreateInput): Promise<Ride> {
        throw new Error("Method not implemented.");
    }

    async findById(rideId: number): Promise<Ride | null> {
        throw new Error("Method not implemented.");
    }

    async findManyFilteredByDriverIdOptinal(customerId: string, driverId?: string | undefined): Promise<Ride[]> {
        throw new Error("Method not implemented.");
    }
    
}