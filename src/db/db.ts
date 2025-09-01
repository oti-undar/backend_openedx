import { PrismaClient, Prisma } from '@prisma/client'
import type { DefaultArgs } from '@prisma/client/runtime/library'

export const db = new PrismaClient()
export type dbTransaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>

export const db_open_edx = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL_OPEN_EDX },
  },
})
