import express from "express"
import morgan from "morgan"
import config from "./config"
import { authorApi } from "./api/author.api"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("short"))

app.get("/", (_req, res) => res.send("Hello World"))
app.use("/author", authorApi)

app.listen(config.PORT, () => console.log(`Listening at ${config.HOST}`))
