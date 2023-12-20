import express from "express"
import { querySchema } from "../validation/query.schema"
import { db } from "../database/db"
import { authorSchema } from "../validation/author.schema"
import { paramSchema } from "../validation/param.schema"

export const authorApi = express.Router()

authorApi.get("/", async (req, res) => {
  const validation = querySchema.safeParse(req.query)
  if (!validation.success) {
    return res.status(400).send(validation.error)
  }
  const { take, skip } = validation.data
  const authors = await db.author.findMany({
    take,
    skip,
  })
  res.send(authors)
})

authorApi.post("/", async (req, res) => {
  const validation = authorSchema.safeParse(req.body)
  if (!validation.success) {
    return res.status(400).send(validation.error)
  }
  const { data } = validation
  const author = await db.author.create({ data })
  res.status(201).send(author)
})

authorApi.get("/:id", async (req, res) => {
  const validation = paramSchema.safeParse(req.params)
  if (!validation.success) {
    console.error(validation.error)
    return res.status(400).send(validation.error)
  }
  const { id } = validation.data
  const author = await db.author.findUnique({ where: { id } })
  if (!author) {
    res.status(404).send("Not Found")
  }
  res.send(author)
})

authorApi.patch("/:id", async (req, res) => {
  const validation = paramSchema.safeParse(req.params)
  if (!validation.success) {
    return res.status(400).send(validation.error)
  }
  const { id } = validation.data
  const authorValidation = authorSchema.safeParse(req.body)
  if (!authorValidation.success) {
    return res.status(400).send(authorValidation.error)
  }
  const { data } = authorValidation
  const author = await db.author.update({ where: { id }, data })
  res.send(author)
})

authorApi.delete("/:id", async (req, res) => {
  const validation = paramSchema.safeParse(req.params)
  if (!validation.success) {
    return res.status(400).send(validation.error)
  }
  const { id } = validation.data
  await db.author.delete({ where: { id } })
  res.status(204).send("OK")
})
