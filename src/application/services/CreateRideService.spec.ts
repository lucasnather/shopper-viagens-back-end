import { beforeEach, it, describe, expect } from 'vitest'
import { Customer } from '../../domain/Customer'
import { InvalidDataError } from '../../domain/errors/InvalidDataError'
import { GoogleMapsRepository } from '../../infra/repository/GoogleMapsRepository'
import { InMemoryCustomerRepository } from '../../infra/repository/in-memory-repository/InMemoryCustomerRepository'
import { InMemoryDriverRepository } from '../../infra/repository/in-memory-repository/InMemoryDriverRepository'
import { CreateRideService } from './CreateRideService'

let customerRepository: InMemoryCustomerRepository
let driverRepository: InMemoryDriverRepository
let googleRepository: GoogleMapsRepository
let sut: CreateRideService

beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository()
    driverRepository = new InMemoryDriverRepository()
    googleRepository = new GoogleMapsRepository()
    sut = new CreateRideService(customerRepository, driverRepository, googleRepository)
})

describe("Unit Test -> Create Ride Service", () => {

    it.skip("Should be able to create a ride", async () => {
        const customer = new Customer(
            "231f5831-86cf-4db3-968c-83ec2c887eb5",
            "Lucas",
            "qualqueremail@email.com"
        )

        customerRepository.customers.push(customer)

        const requestBody = {
            customerId: customer.getId,
            origin: "Arena da Amazônia",
            destination: "Amazonas Shopping"
        }

        const { responseData } = await sut.execute({
            customerId: requestBody.customerId,
            origin: requestBody.origin,
            destination: requestBody.destination
        })

        expect(typeof responseData.origin.latitude).toBe("number")
        expect(typeof responseData.destination.longitude).toBe("number")
        expect(typeof responseData.distance).toBe("number")
        expect(typeof responseData.duration).toBe("number")
    })

    it("Shouldnt be able to create a ride with destination and origin equal", async () => {
        const customer = new Customer(
            "231f5831-86cf-4db3-968c-83ec2c887eb5",
            "Lucas",
            "qualqueremail@email.com"
        )

        customerRepository.customers.push(customer)

        const requestBody = {
            customerId: customer.getId,
            origin: "Arena da Amazônia",
            destination: "Arena da Amazônia"
        }

        expect(async () => {
            await sut.execute({
                customerId: requestBody.customerId,
                origin: requestBody.origin,
                destination: requestBody.destination
            })
        }).rejects.toBeInstanceOf(InvalidDataError)

    })
    it("Shouldnt be able to create a ride invalid customer Id", async () => {
        const customer = new Customer(
            "231f5831-86cf-4db3-968c-83ec2c887eb5",
            "Lucas",
            "qualqueremail@email.com"
        )

        customerRepository.customers.push(customer)

        const requestBody = {
            customerId: "INVALID UUID",
            origin: "Arena da Amazônia",
            destination: "Amazonas Shopping"
        }

        expect(async () => {
            await sut.execute({
                customerId: requestBody.customerId,
                origin: requestBody.origin,
                destination: requestBody.destination
            })
        }).rejects.toBeInstanceOf(Error)

    })
})

