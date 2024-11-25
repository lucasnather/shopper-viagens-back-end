import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { env } from './env'
import { rideRouter } from './infra/routes/ride-router'
import { openapiSpecification } from './swagger/options'
import cors from "cors"

const app = express()

const port = env.PORT
app.use(express.json())
app.use(cors({
    methods: ["POST", "PATCH", "GET"],
    origin: "http://localhost:5173",
}))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

app.get("/test", async (req, res) => {
    res.json({
        message: "Bem-Vindo a Shopper"
    })
})

app.use(rideRouter)

app.listen(port, () => {
    console.log("Server Running")
})
