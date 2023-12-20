import * as z from "zod"
import { getAuthor } from "../api/author.api"

export const bookSchema = z.object({
  title: z.string().min(1).max(255),
  pageCount: z.number().min(1),
  authorId: z
    .number()
    .int()
    .refine(async (val) => getAuthor(val)),
  releaseDate: z.coerce.date().min(new Date("1900-01-01")),
})
