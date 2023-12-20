import express from "express"
import { db } from "../database/db"
import { paramSchema } from "../validation/param.schema"
import { querySchema } from "../validation/query.schema"
import { bookSchema } from "../validation/book.schema"

export const bookApi = express.Router()

bookApi.get("/", async (req, res) => {
  const validation = querySchema.safeParse(req.query)
  if (!validation.success) {
    return res.status(400).send(validation.error)
  }
  const { take, skip } = validation.data
  const books = await db.book.findMany({
    take,
    skip,
  })
  res.send(books)
})

bookApi.post("/", async (req, res) => {
  const validation = await bookSchema.safeParseAsync(req.body)
  if (!validation.success) {
    return res.status(400).send(validation.error)
  }
  const { data } = validation
  const book = await db.book.create({ data })
  res.status(201).send(book)
})

bookApi.get("/:id", async (req, res) => {
  const validation = paramSchema.safeParse(req.params)
  if (!validation.success) {
    return res.status(400).send(validation.error)
  }
  const { id } = validation.data
  const book = await db.book.findUnique({ where: { id } })
  if (!book) {
    res.status(404).send("Not Found")
  }
  res.send(book)
})

bookApi.patch("/:id", async (req, res) => {
  const validation = paramSchema.safeParse(req.params)
  if (!validation.success) {
    return res.status(400).send(validation.error)
  }
  const { id } = validation.data
  const bookValidation = await bookSchema.partial().safeParseAsync(req.body)
  if (!bookValidation.success) {
    return res.status(400).send(bookValidation.error)
  }
  const { data } = bookValidation
  const book = await db.book.update({ where: { id }, data })
  res.send(book)
})

bookApi.delete("/:id", async (req, res) => {
  const validation = paramSchema.safeParse(req.params)
  if (!validation.success) {
    return res.status(400).send(validation.error)
  }
  const { id } = validation.data
  await db.book.delete({ where: { id } })
  res.status(204).send("OK")
})
