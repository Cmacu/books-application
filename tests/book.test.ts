import assert from "assert/strict"
import { describe, it } from "node:test"
import config from "../src/config"

const seed = Math.ceil(Math.random() * 1000)
const bookData = {
  title: "Book " + seed,
  pageCount: seed,
  releaseDate: new Date(),
}

describe("Book", () => {
  let authorId: number
  // create author
  it("should be able to create author (setup)", async () => {
    const response = await fetch(`${config.HOST}/author`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: "Book " + seed,
        lastName: "Author " + seed,
      }),
    })
    assert.strictEqual(201, response.status)
    const data = await response.json()
    assert.strictEqual(true, Number.isInteger(data.id))
    authorId = data.id
  })

  let bookId: number
  it("post should reject invalid data", async () => {
    const response = await fetch(`${config.HOST}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invalid: "data" }),
    })
    assert.strictEqual(400, response.status)
  })

  it("post should return 201:Created", async () => {
    const response = await fetch(`${config.HOST}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...bookData, authorId }),
    })
    assert.strictEqual(201, response.status)
    const data = await response.json()
    assert.strictEqual(bookData.title, data.title)
    assert.strictEqual(bookData.pageCount, data.pageCount)
    assert.strictEqual(authorId, authorId)
    assert.strictEqual(true, Number.isInteger(data.id))
    bookId = data.id
  })

  it("get should return 200:OK", async () => {
    const response = await fetch(`${config.HOST}/book/${bookId}`)
    const data = await response.json()
    assert.strictEqual(200, response.status)
    assert.strictEqual(bookData.title, data.title)
    assert.strictEqual(bookData.pageCount, data.pageCount)
    assert.strictEqual(bookId, data.id)
  })

  it("get 0 should return 404:Not Found", async () => {
    const response = await fetch(`${config.HOST}/book/0`)
    assert.strictEqual(404, response.status)
  })

  // update success
  it("patch should return 200:OK", async () => {
    const title = "Book " + seed + " Updated"
    const response = await fetch(`${config.HOST}/book/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    })
    assert.strictEqual(200, response.status)
    const data = await response.json()
    assert.strictEqual(title, data.title)
    assert.strictEqual(bookId, data.id)
  })

  it("index should return an array", async () => {
    const response = await fetch(`${config.HOST}/book?take=1&skip=0`)
    const data = await response.json()
    assert.strictEqual(200, response.status)
    assert.strictEqual(true, Array.isArray(data))
    assert.strictEqual(1, data.length)
  })

  // delete
  it("delete should return 204:OK", async () => {
    const response = await fetch(`${config.HOST}/book/${bookId}`, {
      method: "DELETE",
    })
    assert.strictEqual(204, response.status)
  })

  // delete
  it("should be able to delete author (cleanup)", async () => {
    const response = await fetch(`${config.HOST}/author/${authorId}`, {
      method: "DELETE",
    })
    assert.strictEqual(204, response.status)
  })

  it("index should reject invalid pagination", async () => {
    const response = await fetch(`${config.HOST}/book?take=invalid&skip=invalid`)
    assert.strictEqual(400, response.status)
  })
})
