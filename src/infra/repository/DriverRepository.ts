import { DriverFactory, DriverProps } from "../../application/gateway/DriverFactory";
import { prisma } from "../../database/prisma";
import { Driver } from "../../domain/Driver";
import { DriverMapper } from "../gateway/DriverMapper";

export class DriverRepository implements DriverFactory {

    constructor(
        private driverMapper: DriverMapper
    ) {}

    async findById(driverId: string): Promise<Driver | null> {
        const findDriver = await prisma.driver.findFirst({
            where: {
                id: driverId
            }
        })

        if(!findDriver) return null

        return this.driverMapper.toDomain(findDriver)
    }

    async findBManyByKilometer(km: number): Promise<DriverProps[]> {
        const findManyByKm = await prisma.driver.findMany({
            where: {
                milage: {
                    lte: km
                }
            }
        })

        const driverWithKm = findManyByKm.map(driver => {
            const pricePerKm = driver.tax.substring(3,7)
            const pricePerKmToNumber = Number(parseFloat(pricePerKm).toFixed(2))

            const totalPrice = pricePerKmToNumber * km
            const rating = driver.rating.substring(0, 3)
            const comment = driver.rating.substring(4,)
        
            return {
                id: driver.id,
                name: driver.name,
                description: driver.description,
                vehicle: driver.car,
                review: {
                    rating,
                    comment
                },
                value: totalPrice
            }

        })

        return driverWithKm
    }
}
