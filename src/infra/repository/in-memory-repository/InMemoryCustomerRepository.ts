import { CustomerFactory } from "../../../application/gateway/CustomerFactory";
import { Customer } from "../../../domain/Customer";

export class InMemoryCustomerRepository implements CustomerFactory {

    async findById(customerId: string): Promise<Customer | null> {
        throw new Error("Method not implemented.");
    }

}