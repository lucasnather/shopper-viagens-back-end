import { randomUUID } from "node:crypto"

export class Customer {

    private id: string
    private email?: string
    private name: string
    private createdAt: Date

    constructor(
        id: string,
        name: string,
        createdAt: Date,
        email?: string,
    ) {
        this.id = id || randomUUID()
        this.email = email || ""
        this.name = name
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

    get getEmail() {
        return this.email
    }

    set setEmail(email: string) {
        this.email = email
    }

    get getCreatedAt() {
        return this.createdAt
    }

}