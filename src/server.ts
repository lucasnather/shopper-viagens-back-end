import express from 'express'
import { env } from './env'
import { rideRouter } from './infra/routes/ride-router'

const app = express()

const port = env.PORT
app.use(express.json())

app.get("/test", async (req, res) => {
    res.json({
        message: "Bem-Vindo a Shopper"
    })
})

app.use(rideRouter)

app.listen(port, () => {
    console.log("Server Running")
})
