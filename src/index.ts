import express from "express"
import morgan from "morgan"
import { config } from "./config"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("short"))

app.use("/", (_req, res) => res.send("Hello World"))

app.listen(config.PORT, () => console.log(`Listening at http://localhost:${config.PORT}`))
