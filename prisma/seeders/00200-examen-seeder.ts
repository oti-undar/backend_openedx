import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function examenSeeder() {
  await prisma.examen.create({
    data: {
      title: 'Examen 1',
      description: 'Examen 1',
      img: 'https://via.placeholder.com/150',
      video: 'https://via.placeholder.com/150',
      user_id: '1',
      state_id: 1,
      fecha_vencimiento: new Date(),
    },
  })
}
