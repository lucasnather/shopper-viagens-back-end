import { CustomerFactory, CustomerProps } from "../../../application/gateway/CustomerFactory";
import { Customer } from "../../../domain/Customer";

export class InMemoryCustomerRepository implements CustomerFactory {
   

    public customers: Customer[] = []

    async findById(customerId: string): Promise<Customer | null> {
        const findCustomer = this.customers.filter(customer => {
            return customer.getId === customerId
        })

        if(findCustomer.length === 0) return null

        return findCustomer[0]
    }

    async findMany(): Promise<CustomerProps[]> {
        throw new Error("Method not implemented.");
    }

}