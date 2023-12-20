import { PrismaClient } from "@prisma/client"
import config from "../config"

export const db = new PrismaClient({
  log: config.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
})
