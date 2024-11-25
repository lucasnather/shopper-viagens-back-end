import { beforeEach, it, describe, expect } from 'vitest'
import { Customer } from '../../domain/Customer'
import { Driver } from '../../domain/Driver'
import { DriverNotFoundError } from '../../domain/errors/DriverNotFoundError'
import { NoRidesRoundError } from '../../domain/errors/NoRidesRoundsError'
import { Ride } from '../../domain/Ride'
import { InMemoryCustomerRepository } from '../../infra/repository/in-memory-repository/InMemoryCustomerRepository'
import { InMemoryDriverRepository } from '../../infra/repository/in-memory-repository/InMemoryDriverRepository'
import { InMemoryRideRepository } from '../../infra/repository/in-memory-repository/InMemoryRideRepository'
import { FindManyRidesService } from './FindManyRidesService'

let rideRepository: InMemoryRideRepository
let customerRepository: InMemoryCustomerRepository
let driverRepository: InMemoryDriverRepository
let sut: FindManyRidesService

beforeEach(() => {
    rideRepository = new InMemoryRideRepository()
    customerRepository = new InMemoryCustomerRepository()
    driverRepository = new InMemoryDriverRepository()
    sut = new FindManyRidesService(rideRepository, driverRepository)
})

describe("Unit Test -> Find Many Ride Service", () => {

    it("Should be able to find a ride with consumer id", async () => {
        const customer = new Customer(
            "231f5831-86cf-4db3-968c-83ec2c887eb5",
            "Lucas",
            "qualqueremail@email.com"
        )

        const driver = new Driver(
            "5808c614-5f91-472b-b1f8-203a392049d2",
            "Homer Simpson",
            "Olá! Sou Homer, seumotorista camarada!",
            "Plymouth Valiant 1973 rosa e enferrujado",
            "2/5 Motorista simpático,",
            "R$ 2,50/km",
            1
        )

        const createRide = new Ride(
            new Date(),
            "Amazonas Shopping",
            "Millenium Shooping",
            12,
            982,
            50,
            customer.getId,
            driver.getId
        )

        customerRepository.customers.push(customer)
        driverRepository.drivers.push(driver)
        rideRepository.rides.push(createRide)

        const { ride } = await sut.execute({
           customerId:  customer.getId
        })

        expect(ride).toHaveLength(1)
    })

    it("Should be able to find a ride with costumer and driver", async () => {
        const customer = new Customer(
            "231f5831-86cf-4db3-968c-83ec2c887eb5",
            "Lucas",
            "qualqueremail@email.com"
        )

        const driver = new Driver(
            "5808c614-5f91-472b-b1f8-203a392049d2",
            "Homer Simpson",
            "Olá! Sou Homer, seumotorista camarada!",
            "Plymouth Valiant 1973 rosa e enferrujado",
            "2/5 Motorista simpático,",
            "R$ 2,50/km",
            1
        )

        const createRide = new Ride(
            new Date(),
            "Amazonas Shopping",
            "Millenium Shooping",
            12,
            982,
            50,
            customer.getId,
            driver.getId
        )

        customerRepository.customers.push(customer)
        driverRepository.drivers.push(driver)
        rideRepository.rides.push(createRide)

        const { ride } = await sut.execute({
           customerId:  customer.getId,
           driverId: driver.getId
        })

        expect(ride).toHaveLength(1)
    })

    it("Shouldnt be able to find a ride with invalid customer", async () => {
        const customer = new Customer(
            "231f5831-86cf-4db3-968c-83ec2c887eb5",
            "Lucas",
            "qualqueremail@email.com"
        )

        const driver = new Driver(
            "5808c614-5f91-472b-b1f8-203a392049d2",
            "Homer Simpson",
            "Olá! Sou Homer, seumotorista camarada!",
            "Plymouth Valiant 1973 rosa e enferrujado",
            "2/5 Motorista simpático,",
            "R$ 2,50/km",
            1
        )

        const createRide = new Ride(
            new Date(),
            "Amazonas Shopping",
            "Millenium Shooping",
            12,
            982,
            50,
            customer.getId,
            driver.getId
        )

        customerRepository.customers.push(customer)
        driverRepository.drivers.push(driver)
        rideRepository.rides.push(createRide)

        expect(async () => {
            await sut.execute({
                customerId:  "INVALID_CUSTOMER"
             })
        }).rejects.toBeInstanceOf(NoRidesRoundError)
    })

    it("Shouldnt be able to find a ride with invalid driver", async () => {
        const customer = new Customer(
            "231f5831-86cf-4db3-968c-83ec2c887eb5",
            "Lucas",
            "qualqueremail@email.com"
        )

        const driver = new Driver(
            "5808c614-5f91-472b-b1f8-203a392049d2",
            "Homer Simpson",
            "Olá! Sou Homer, seumotorista camarada!",
            "Plymouth Valiant 1973 rosa e enferrujado",
            "2/5 Motorista simpático,",
            "R$ 2,50/km",
            1
        )

        const createRide = new Ride(
            new Date(),
            "Amazonas Shopping",
            "Millenium Shooping",
            12,
            982,
            50,
            customer.getId,
            driver.getId
        )

        customerRepository.customers.push(customer)
        driverRepository.drivers.push(driver)
        rideRepository.rides.push(createRide)

        expect(async () => {
            await sut.execute({
                customerId: customer.getId,
                driverId: "INVALID_DRIVER"
             })
        }).rejects.toBeInstanceOf(DriverNotFoundError)

        
    })
})

