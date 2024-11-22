import { CreateRideService } from "../../application/services/CreateRideService"
import { CustomerMapper } from "../gateway/CustomerMapper"
import { DriverMapper } from "../gateway/DriverMapper"
import { CustomerRepository } from "../repository/CustomerRepository"
import { DriverRepository } from "../repository/DriverRepository"
import { GoogleMapsRepository } from "../repository/GoogleMapsRepository"



export class MakeCreateRideFactory {

    static factory() {
        const customerMapper = new CustomerMapper()
        const driverMapper = new DriverMapper()
        const customerRepository = new CustomerRepository(customerMapper)
        const driverRepository = new DriverRepository(driverMapper)
        const googleRepository = new GoogleMapsRepository()
        return new CreateRideService(customerRepository, driverRepository, googleRepository)
    }
}