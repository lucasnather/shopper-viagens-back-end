import { DriverFactory, DriverProps } from "../../../application/gateway/DriverFactory";
import { Driver } from "../../../domain/Driver";

export class InMemoryDriverRepository implements DriverFactory {

    private drivers: Driver[] = []

    async findById(driverId: string): Promise<Driver | null> {
        const findDriver = this.drivers.filter(driver => {
            return driver.getId === driverId
        })

        if(findDriver.length === 0) return null

        return findDriver[0]
    }
    
    async findBManyByKilometer(km: number): Promise<DriverProps[]> {
        const findDriver = this.drivers.filter(driver => {
            return driver.getMilage < km
        })

        const driverWithKm = findDriver.map(driver => {
            const pricePerKm = driver.getTax.substring(3,7)
            const pricePerKmToNumber = Number(parseFloat(pricePerKm).toFixed(2))
        
            const totalPrice = pricePerKmToNumber * km
            const rating = driver.getRating.substring(0, 3)
            const comment = driver.getRating.substring(4,)
        
            return {
                id: driver.getId,
                name: driver.getName,
                description: driver.getDescription,
                vehicle: driver.getCar,
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