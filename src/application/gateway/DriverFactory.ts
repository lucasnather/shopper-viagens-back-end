import { Driver } from "../../domain/Driver";

export interface DriverProps {
    id: string
    name: string
    description: string
    vehicle: string
    review: Review
    value: number
}

export interface Review {
    rating: string,
    comment: string
}

export interface DriverFactory {
    findById(driverId: string): Promise<Driver | null>
    findBManyByKilometer(km: number): Promise<DriverProps[]>
}
