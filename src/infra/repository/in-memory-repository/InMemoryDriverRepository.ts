import { DriverFactory, DriverProps } from "../../../application/gateway/DriverFactory";
import { Driver } from "../../../domain/Driver";

export class InMemoryDriverRepository implements DriverFactory {

    async findById(driverId: string): Promise<Driver | null> {
        throw new Error("Method not implemented.");
    }
    
    async findBManyByKilometer(km: number): Promise<DriverProps[]> {
        throw new Error("Method not implemented.");
    }
    
}