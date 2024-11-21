import { Prisma } from "@prisma/client";
import { Ride } from "../../domain/Ride";

export interface RideFactory {
    create(ride: Prisma.RideUncheckedCreateInput):Promise<Ride>
    confirm(ride: Prisma.RideUpdateInput): Promise<Ride>
    findById(rideId: number): Promise<Ride | null>
}