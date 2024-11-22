import { Customer } from "../../domain/Customer";

export interface CustomerFactory {
    findById(customerId: string): Promise<Customer |  null>
}