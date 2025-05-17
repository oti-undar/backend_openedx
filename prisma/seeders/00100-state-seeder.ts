import { PrismaClient, StateType } from '@prisma/client'

const prisma = new PrismaClient()

export default async function stateSeeder() {
  await prisma.state.createMany({
    data: Object.values(StateType).map(value => ({
      name: value,
    })),
  })
}
