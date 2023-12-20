import assert from "assert/strict"
import { describe, it } from "node:test"
import config from "../src/config"

const seed = Math.ceil(Math.random() * 1000)
const authorData = {
  firstName: "Stasi " + seed,
  lastName: "Vladimirov " + seed,
}

describe("Author", () => {
  let authorId: number
  it("post should reject invalid data", async () => {
    const response = await fetch(`${config.HOST}/author`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invalid: "data" }),
    })
    assert.strictEqual(400, response.status)
  })

  it("post should return 201:Created", async () => {
    const response = await fetch(`${config.HOST}/author`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authorData),
    })
    assert.strictEqual(201, response.status)
    const data = await response.json()
    assert.strictEqual(authorData.firstName, data.firstName)
    assert.strictEqual(authorData.lastName, data.lastName)
    assert.strictEqual(true, Number.isInteger(data.id))
    authorId = data.id
  })

  it("get should return 200:OK", async () => {
    const response = await fetch(`${config.HOST}/author/${authorId}`)
    const data = await response.json()
    assert.strictEqual(200, response.status)
    assert.strictEqual(authorData.firstName, data.firstName)
    assert.strictEqual(authorData.lastName, data.lastName)
    assert.strictEqual(authorId, data.id)
  })

  it("get 0 should return 404:Not Found", async () => {
    const response = await fetch(`${config.HOST}/author/0`)
    assert.strictEqual(404, response.status)
  })

  // update success
  it("patch should return 200:OK", async () => {
    const firstName = "Stasi " + seed + " Updated"
    const lastName = "Vladimirov " + seed + " Updated"
    const response = await fetch(`${config.HOST}/author/${authorId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
      }),
    })
    assert.strictEqual(200, response.status)
    const data = await response.json()
    assert.strictEqual(firstName, data.firstName)
    assert.strictEqual(lastName, data.lastName)
    assert.strictEqual(authorId, data.id)
  })

  it("index should return an array", async () => {
    const response = await fetch(`${config.HOST}/author?take=1&skip=0`)
    const data = await response.json()
    assert.strictEqual(200, response.status)
    assert.strictEqual(true, Array.isArray(data))
    assert.strictEqual(1, data.length)
  })

  // delete
  it("delete should return 200:OK", async () => {
    const response = await fetch(`${config.HOST}/author/${authorId}`, {
      method: "DELETE",
    })
    assert.strictEqual(204, response.status)
  })

  it("index should reject invalid pagination", async () => {
    const response = await fetch(`${config.HOST}/author?take=invalid&skip=invalid`)
    assert.strictEqual(400, response.status)
  })
})
