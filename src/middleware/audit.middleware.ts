import express from "express"
import { db } from "../database/db"

export const auditMiddleware: express.Handler = (req, res, next) => {
  res.on("finish", async () => {
    const request = req.originalUrl.split("?")[0].split("/")
    const entity = request.length > 1 ? request[1] : undefined
    const entityId = isNaN(+request[2]) ? undefined : +request[2]
    const action = req.method
    const status = res.statusCode
    const query = req.query
    const data = req.body

    const auditLog = await db.auditLog.create({
      data: {
        entity,
        entityId,
        action,
        status,
        query,
        data,
      },
    })
  })

  return next()
}
