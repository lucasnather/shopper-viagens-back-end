import { CustomerFactory } from "../../application/gateway/CustomerFactory";
import { prisma } from "../../database/prisma";
import { Customer } from "../../domain/Customer";
import { CustomerMapper } from "../gateway/CustomerMapper";

export class CustomerRepository implements CustomerFactory {

    constructor(
        private customerMapper: CustomerMapper
    ) {}

    async findById(customerId: string): Promise<Customer | null> {
        const findCustomer = await prisma.customer.findFirst({
            where: {
                id: customerId
            }
        })

        if(!findCustomer) return null

        return this.customerMapper.toDomain(findCustomer)
    }
}