import z from "zod"

export const registerPostValidation = z.object({
  email: z.string().min(1, "E-Mail ist ein Pflichtfeld").max(60),
  userName: z.string().min(1, "Username ist ein Pflichtfeld").max(60),
  firstName: z.string().min(1, "FirstName ist ein Pflichtfeld").max(60),
  lastName: z.string().min(1, "LastName ist ein Pflichtfeld").max(60),
  password: z.string().min(1, "Password ist ein Pflichtfeld").max(60),
})

export type PostRegister = z.infer<typeof registerPostValidation>

export const loginGetValidation = z.object({
  userName: z.string().min(1, "Username ist ein Pflichtfeld").max(60),
  password: z.string().min(1, "Password ist ein Pflichtfeld").max(60),
})

export type GetLogin = z.infer<typeof loginGetValidation>
