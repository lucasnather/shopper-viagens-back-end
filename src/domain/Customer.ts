import { randomUUID } from "node:crypto"

export class Customer {

    private id: string
    private name: string
    private email?: string 
    private createdAt: Date

    constructor(
        id: string,
        name: string,
        email?: string | null,
        createdAt?: Date,
    ) {
        this.id = id || randomUUID()
        this.name = name
        this.email = email || ""
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