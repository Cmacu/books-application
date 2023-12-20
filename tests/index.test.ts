import assert from "assert/strict"
import { describe, it } from "node:test"
import { config } from "../src/config"

describe("Server", () => {
  it("Root should return 200:OK", async () => {
    const response = await fetch(`http://localhost:${config.PORT}`)
    assert.strictEqual(200, response.status)
  })
})
