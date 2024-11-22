import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { Driver } from "../../domain/Driver";

export class DriverMapper {

    toDomain(driver: Prisma.DriverCreateInput): Driver {
        const id = driver.id ||  randomUUID()

        return new Driver(
            id,
            driver.name,
            driver.description,
            driver.car,
            driver.rating,
            driver.tax,
            driver.milage,
        )
    }

    toPrisma(driver: Driver) {
        return {
            id: driver.getId,
            name: driver.getName,
            description: driver.getDescription,
            car: driver.getCar,
            rating: driver.getRating,
            tax: driver.getTax,
            milage: driver.getMilage,
        }
    }
}