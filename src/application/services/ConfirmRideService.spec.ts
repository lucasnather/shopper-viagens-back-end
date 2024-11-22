import { beforeEach, it, describe, expect } from 'vitest'
import { Customer } from '../../domain/Customer'
import { Driver } from '../../domain/Driver'
import { DriverNotFoundError } from '../../domain/errors/DriverNotFoundError'
import { InvalidMilageToDriveError } from '../../domain/errors/InvalidMilageToDriverError'
import { InMemoryCustomerRepository } from '../../infra/repository/in-memory-repository/InMemoryCustomerRepository'
import { InMemoryDriverRepository } from '../../infra/repository/in-memory-repository/InMemoryDriverRepository'
import { InMemoryRideRepository } from '../../infra/repository/in-memory-repository/InMemoryRideRepository'
import { ConfirmRideService } from './ConfirmRideService'

let rideRepository: InMemoryRideRepository
let customerRepository: InMemoryCustomerRepository
let driverRepository: InMemoryDriverRepository
let sut: ConfirmRideService

beforeEach(() => {
    rideRepository = new InMemoryRideRepository()
    customerRepository = new InMemoryCustomerRepository()
    driverRepository = new InMemoryDriverRepository()
    sut = new ConfirmRideService(rideRepository, driverRepository)
})

describe("Unit Test -> Confirm Ride Service", () => {

    it("Should be able to create a ride", async () => {
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

        customerRepository.customers.push(customer)
        driverRepository.drivers.push(driver)

        const requestBodyConfirm = {
            customer_id: "231f5831-86cf-4db3-968c-83ec2c887eb5",
            origin: "Amazonas Shopping",
            destination: "Maternidade Balbina Mestrinho",
            distance: 8.176,
            duration: 17,
            driver: {
                id: driver.getId,
                name: driver.getName
            },
            value: 16.352
        }

        const { ride } = await sut.execute({
            customerId: requestBodyConfirm.customer_id,
            destination: requestBodyConfirm.destination,
            distance: requestBodyConfirm.distance,
            driver: {
                id: requestBodyConfirm.driver.id,
                name: requestBodyConfirm.driver.name
            },
            duration: requestBodyConfirm.duration,
            origin: requestBodyConfirm.origin,
            value: requestBodyConfirm.value
        })

        expect(ride.getCreatedAt).toBeTruthy()
        expect(ride.getDestination).toEqual("Maternidade Balbina Mestrinho")
    })

    it("Shouldnt be able to confirm a ride with invalid driver id", async () => {
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

        customerRepository.customers.push(customer)
        driverRepository.drivers.push(driver)

        const requestBodyConfirm = {
            customer_id: "231f5831-86cf-4db3-968c-83ec2c887eb5",
            origin: "Amazonas Shopping",
            destination: "Maternidade Balbina Mestrinho",
            distance: 8.176,
            duration: 17,
            driver: {
                id: "INVALID_DRIVER_ID",
                name: driver.getName
            },
            value: 16.352
        }

        expect(async () => {
            await sut.execute({
                customerId: requestBodyConfirm.customer_id,
                destination: requestBodyConfirm.destination,
                distance: requestBodyConfirm.distance,
                driver: {
                    id: requestBodyConfirm.driver.id,
                    name: requestBodyConfirm.driver.name
                },
                duration: requestBodyConfirm.duration,
                origin: requestBodyConfirm.origin,
                value: requestBodyConfirm.value
            })
        }).rejects.toBeInstanceOf(DriverNotFoundError)

    })

    it("Shouldnt be able to confirm a ride with driver milage less than ride KM", async () => {
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

        customerRepository.customers.push(customer)
        driverRepository.drivers.push(driver)

        const requestBodyConfirm = {
            customer_id: "231f5831-86cf-4db3-968c-83ec2c887eb5",
            origin: "Amazonas Shopping",
            destination: "Maternidade Balbina Mestrinho",
            distance: 0.5,
            duration: 17,
            driver: {
                id: driver.getId,
                name: driver.getName
            },
            value: 16.352
        }

        expect(async () => {
            await sut.execute({
                customerId: requestBodyConfirm.customer_id,
                destination: requestBodyConfirm.destination,
                distance: requestBodyConfirm.distance,
                driver: {
                    id: requestBodyConfirm.driver.id,
                    name: requestBodyConfirm.driver.name
                },
                duration: requestBodyConfirm.duration,
                origin: requestBodyConfirm.origin,
                value: requestBodyConfirm.value
            })
        }).rejects.toBeInstanceOf(InvalidMilageToDriveError)

    })
})

