import { randomUUID } from "node:crypto"

export class Driver {

    private id: string
    private name: string
    private description: string
    private car: string
    private rating: string
    private tax: string
    private milage: number
    private createdAt?: Date

    constructor(
        id: string,
        name: string,
        description: string,
        car: string,
        rating: string,
        tax: string,
        milage: number,
        createdAt?: Date,
    ) {
        this.id = id || randomUUID()
        this.name = name
        this.description = description
        this.car = car
        this.rating = rating
        this.tax = tax
        this.milage = milage
        this.createdAt = createdAt || new Date()
    }

    get getId() {
        return this.id
    }

    get getName() {
        return this.name
    }

    set setName(name: string) {
        this.name = name
    }

    get getDescription() {
        return this.description
    }

    set setDescription(description: string) {
        this.description = description
    }

    get getCar() {
        return this.car
    }

    set setCar(car: string) {
        this.car = car
    }


    get getRating() {
        return this.rating
    }

    set setRating(rating: string) {
        this.rating = rating
    }


    get getTax() {
        return this.tax
    }

    set setTax(tax: string) {
        this.tax = tax
    }

    get getMilage() {
        return this.milage
    }

    set setMilage(milage: number) {
        this.milage = milage
    }

    get getCreatedAt() {
        return this.createdAt
    }

}