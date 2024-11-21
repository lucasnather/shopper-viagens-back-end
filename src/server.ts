import express from 'express'
import { env } from './env'

const app = express()

const port = env.PORT
app.use(express.json())

app.get("/test", async (req, res) => {
    res.json({
        message: "Bem-Vindo a Shopper"
    })
})

app.listen(port, () => {
    console.log("Server Running")
})

