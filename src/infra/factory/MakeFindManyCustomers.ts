import { FindManyCustomersService } from "../../application/services/FindManyCustomersService"
import { CustomerMapper } from "../gateway/CustomerMapper"
import { CustomerRepository } from "../repository/CustomerRepository"

export class MakeFindManyCustomersFactory {

    static factory() {
 
        const customerrMapper = new CustomerMapper()
        const customerRepository = new CustomerRepository(customerrMapper)
        return new FindManyCustomersService(customerRepository)
    }
}