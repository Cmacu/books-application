import express from "express"
import morgan from "morgan"
import config from "./config"
import { authorApi } from "./api/author.api"
import { bookApi } from "./api/book.api"
import { auditMiddleware } from "./middleware/audit.middleware"
import { auditApi } from "./api/audit.api"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("short"))

app.get("/", (_req, res) => res.send("Hello World"))

app.use(auditMiddleware)

app.use("/author", authorApi)
app.use("/book", bookApi)
app.use("/audit", auditApi)

app.listen(config.PORT, () => console.log(`Listening at ${config.HOST}`))
