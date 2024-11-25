
import { CustomerFactory } from "../gateway/CustomerFactory";

interface FindManyCustomersResponse {
    customers:  Customers[]
}

interface Customers {
    id: string
    name: string
}

export class FindManyCustomersService {

    constructor(
        private customerRepository: CustomerFactory,
    ) {}

    async execute(): Promise<FindManyCustomersResponse> {
        const customers = await this.customerRepository.findMany()

        return {
            customers
        }
    }
}