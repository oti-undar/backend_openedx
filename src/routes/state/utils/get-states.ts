import type { dbTransaction } from '@/db/db.js'

export async function getStates({ prisma }: { prisma: dbTransaction }) {
  const states = await prisma.state.findMany()
  return states
}
