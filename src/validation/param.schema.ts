import * as z from "zod"

export const paramSchema = z.object({
  id: z.coerce.number().int(),
})
