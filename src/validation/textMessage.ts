import z from "zod"

export const sendTextMessageValidation = z.object({
  textMessage: z.string().min(1, "Nachricht darf nicht leer sein").max(999),
})

export type PostTextMessage = z.infer<typeof sendTextMessageValidation>
