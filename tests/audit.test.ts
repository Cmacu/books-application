import assert from "assert/strict"
import { describe, it } from "node:test"
import config from "../src/config"

const seed = Math.ceil(Math.random() * 1000)
const authorData = {
  firstName: "Audit " + seed,
  lastName: "Log " + seed,
}

describe("Audit", () => {
  let authorId: number
  // create author
  it("should be able to create author (audit)", async () => {
    const response = await fetch(`${config.HOST}/author`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authorData),
    })
    assert.strictEqual(201, response.status)
    const data = await response.json()
    assert.strictEqual(true, Number.isInteger(data.id))
    authorId = data.id
  })

  // delete
  it("should be able to delete author (cleanup)", async () => {
    const response = await fetch(`${config.HOST}/author/${authorId}`, {
      method: "DELETE",
    })
    assert.strictEqual(204, response.status)
  })

  it("index should return an array", async () => {
    const response = await fetch(`${config.HOST}/audit`)
    const data = await response.json()
    console.error("audit data", data)
    assert.strictEqual(200, response.status)
    assert.strictEqual(true, Array.isArray(data))
    assert.strictEqual(true, data.length > 1)
  })

  it("post should return 404:Not found ", async () => {
    const response = await fetch(`${config.HOST}/audit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invalid: "data" }),
    })
    assert.strictEqual(404, response.status)
  })
})
