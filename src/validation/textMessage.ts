import z from "zod"

export const sendTextMessageValidation = z.object({
  textMessage: z.string().max(999).optional(),
  file: z.any().optional(),
})

export type PostTextMessage = z.infer<typeof sendTextMessageValidation>
