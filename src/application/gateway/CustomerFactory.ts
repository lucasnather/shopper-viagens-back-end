import { Customer } from "../../domain/Customer";

export interface CustomerProps {
    id: string
    name: string
}

export interface CustomerFactory {
    findById(customerId: string): Promise<Customer |  null>
    findMany(): Promise<CustomerProps[]>
}