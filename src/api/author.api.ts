import express from "express"

export const authorApi = express.Router()

authorApi.get("/", (req, res) => {
  res.send("Hello World")
})
