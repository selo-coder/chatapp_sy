/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from "@prisma/client"

// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// eslint-disable-next-line import/prefer-default-export
export const prismaClient = globalForPrisma.prisma ?? new PrismaClient()

// only in development we want to keep the prisma client not in the global scope
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClient
