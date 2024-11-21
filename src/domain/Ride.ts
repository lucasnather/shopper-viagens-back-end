import { randomUUID } from "node:crypto"

export class Ride {

    private id: string
    private date: Date
    private origin: string
    private destination: string
    private distance: string
    private duration: string
    private value: number
    private createdAt: Date
    private customerId: string
    private driverId: string

    constructor(
        id: string,
        date: Date,
        origin: string,
        destination: string,
        distance: string,
        duration: string,
        value: number,
        createdAt: Date,
        customerId: string,
        driverId: string,
    ) {
        this.id = id || randomUUID()
        this.date = date
        this.origin = origin
        this.destination = destination
        this.distance = distance
        this.duration = duration
        this.value = value
        this.createdAt = createdAt || new Date()
        this.customerId = customerId
        this.driverId = driverId
    }

    get getId() {
        return this.id
    }

    get getCusomerId() {
        return this.customerId
    }

    get getDriverId() {
        return this.driverId
    }

    get getDate() {
        return this.date
    }

    set setDate(date: Date) {
        this.date = date
    }

    get getOrigin() {
        return this.origin
    }

    set setOrigin(origin: string) {
        this.origin = origin
    }

    get getDestination() {
        return this.destination
    }

    set setDestination(destination: string) {
        this.destination = destination
    }


    get getDistance() {
        return this.distance
    }

    set setDistance(distance: string) {
        this.distance = distance
    }


    get getDuration() {
        return this.duration
    }

    set setDuration(duration: string) {
        this.duration = duration
    }

    get getValue() {
        return this.value
    }

    set setValue(value: number) {
        this.value = value
    }

    get getCreatedAt() {
        return this.createdAt
    }

}