import express from "express"
import { querySchema } from "../validation/query.schema"
import { db } from "../database/db"

export const auditApi = express.Router()

auditApi.get("/", async (req, res) => {
  const validation = querySchema.safeParse(req.query)
  if (!validation.success) {
    return res.status(400).send(validation.error)
  }
  const { take, skip } = validation.data
  const audits = await db.auditLog.findMany({
    take,
    skip,
  })
  res.send(audits)
})
