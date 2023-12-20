import * as z from "zod"

export const querySchema = z.object({
  take: z.coerce
    .number({
      description: "Page number. Type: number, optional. Examples: 1, 2, 3. Default: 1",
    })
    .default(10),
  skip: z.coerce
    .number({
      description: "Number of items per page. Type: number, optional. Examples: 10, 20, 30. Default: 10",
    })
    .default(0),
})
