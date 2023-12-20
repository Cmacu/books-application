import assert from "assert/strict"
import { describe, it } from "node:test"
import config from "../src/config"

describe("Server", () => {
  it("Root should return 200:OK", async () => {
    const response = await fetch(`${config.HOST}/`)
    assert.strictEqual(200, response.status)
  })
  it("invalid paths should return 404:Not Found", async () => {
    const response = await fetch(`${config.HOST}/invalid/path`)
    assert.strictEqual(404, response.status)
  })
})
