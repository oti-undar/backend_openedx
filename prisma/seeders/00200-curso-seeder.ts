import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function cursoSeeder() {
  await prisma.curso.createMany({
    data: [
      {
        id: '620e4567-e89b-12d3-a456-426614174000',
        name: 'Curso Armonía',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Curso Recursos TIC',
      },
    ],
  })

  await prisma.usuarioCurso.createMany({
    data: [
      {
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        curso_id: '620e4567-e89b-12d3-a456-426614174000',
      },
      {
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        curso_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
    ],
  })
}
