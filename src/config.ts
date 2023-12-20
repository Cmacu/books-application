import * as z from "zod"
import dotenv from "dotenv"

dotenv.config()

const configSchema = z.object({
  PORT: z.coerce
    .number({
      description: "Server Port environment variable. Type: number, optional. Examples: 3000, 5000. Default: 3000",
    })
    .default(3000),
  NODE_ENV: z
    .string({
      description:
        "Node environment configuration. Type: string, optional. Examples: development, testing, production. Default: development",
    })
    .default("development"),
  DATABASE_URL: z.string({
    description:
      "Database URL environment variable. Type: string, required. Examples: postgres://user:password@localhost:5432/database",
  }),
})

const config = configSchema.parse(process.env)

export default {
  ...config,
  HOST: `http://localhost:${config.PORT}`,
}
