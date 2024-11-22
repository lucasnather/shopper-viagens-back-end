import { CustomerFactory } from "../../../application/gateway/CustomerFactory";
import { Customer } from "../../../domain/Customer";

export class InMemoryCustomerRepository implements CustomerFactory {

    private customers: Customer[] = []

    async findById(customerId: string): Promise<Customer | null> {
        const findCustomer = this.customers.filter(customer => {
            return customer.getId === customerId
        })

        if(findCustomer.length === 0) return null

        return findCustomer[0]
    }

}