import type { Account as Acc } from "@prisma/client"

export type Account = Omit<Acc, "password"> & { isOnline?: boolean }
