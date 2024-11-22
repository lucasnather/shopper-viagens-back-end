import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { Customer } from "../../domain/Customer";

export class CustomerMapper {

    toDomain(customer: Prisma.CustomerCreateInput): Customer {
        const id = customer.id ||  randomUUID()

        return new Customer(
            id,
            customer.name,
            customer.email
        )
    }

    toPrisma(customer: Customer) {
        return {
            id: customer.getId,
            name: customer.getName,
            email: customer.getEmail
        }
    }
}