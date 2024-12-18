
export class Ride {

    private id: number = 0
    private date: Date
    private origin: string
    private destination: string
    private distance: number
    private duration: number
    private value: number
    private customerId: string
    private driverId: string
    private createdAt?: Date

    constructor(
        date: Date,
        origin: string,
        destination: string,
        distance: number ,
        duration: number,
        value: number,
        customerId: string,
        driverId: string,
        createdAt?: Date,
    ) {
        this.id = this.idAutoincrement()
        this.date = date
        this.origin = origin
        this.destination = destination
        this.distance = distance 
        this.duration = duration
        this.value = value
        this.customerId = customerId
        this.driverId = driverId
        this.createdAt = createdAt || new Date()
    }

    get getId() {
        return this.id
    }

    private idAutoincrement() {
        return ++this.id
    }

    get getCustomerId() {
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

    set setDistance(distance: number) {
        this.distance = distance
    }


    get getDuration() {
        return this.duration
    }

    set setDuration(duration: number) {
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