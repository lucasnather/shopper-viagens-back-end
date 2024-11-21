import { prisma } from "../src/database/prisma"

async function main() {

    await prisma.customer.deleteMany({})
    await prisma.driver.deleteMany({})

    await prisma.customer.createManyAndReturn({
        data: [
            {
                name: "Lucas",
                email: "emailopcional@email.com"
            },
            {
                name: "Shopper",
                email: "shopperviagem@memail.com"
            },
            {
                name: "Teste",
                email: "teste@email.com"
            }
        ],
        select: {
            id: true,
            name: true
        }
    })

    await prisma.driver.createMany({
        data: [
            {
                name: "Home Simpson",
                description: "Olá! Sou Homer, seumotorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
                car: "Plymouth Valiant 1973 rosa e enferrujado",
                rating: "2/5 Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
                tax: "R$ 2,50/km",
                milage: 1
            },
            {
                name: "Dominic Toretto",
                description: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
                car: "Dodge Charger R/T 1970 modificado",
                rating: "4/5 Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
                tax: "R$ 5,00/km",
                milage: 5
            },
            {
                name: "James Bond",
                description: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
                car: "Aston Martin DB5 clássico",
                rating: "5/5 Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
                tax: "R$ 10,00/km",
                milage: 10
            }
        ]
    })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })