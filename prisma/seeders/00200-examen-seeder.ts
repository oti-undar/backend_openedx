import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function examenSeeder() {
  const examen = await prisma.examen.create({
    data: {
      title: 'Examen 1',
      description: 'Examen 1',
      img: 'https://via.placeholder.com/150',
      user_id: '1',
      state_id: 1,
      fecha_vencimiento: new Date(),
      preguntas: {
        create: [
          {
            title: 'Pregunta 1',
            description: 'Pregunta 1',
            img: 'https://via.placeholder.com/150',
            respuestas: {
              create: [
                {
                  respuesta: 'Respuesta 1 1',
                  correcta: true,
                },
                {
                  respuesta: 'Respuesta 1 2',
                },
                {
                  respuesta: 'Respuesta 1 3',
                },
                {
                  respuesta: 'Respuesta 1 4',
                },
              ],
            },
          },
          {
            title: 'Pregunta 2',
            description: 'Pregunta 2',
            video: 'https://via.placeholder.com/150',
            respuestas: {
              create: [
                {
                  respuesta: 'Respuesta 2 1',
                },
                {
                  respuesta: 'Respuesta 2 2',
                },
                {
                  respuesta: 'Respuesta 2 3',
                },
                {
                  respuesta: 'Respuesta 2 4',
                  correcta: true,
                },
              ],
            },
          },
        ],
      },
    },
  })

  await prisma.examen.create({
    data: {
      title: 'Examen 2',
      description: 'Examen 2',
      video: 'https://via.placeholder.com/150',
      user_id: '1',
      state_id: 1,
      fecha_vencimiento: new Date(),
      preguntas: {
        create: [
          {
            title: 'Pregunta 1',
            description: 'Pregunta 1',
            img: 'https://via.placeholder.com/150',
            video: 'https://via.placeholder.com/150',
            respuestas: {
              create: [
                {
                  respuesta: 'Respuesta 1 1',
                  correcta: true,
                },
                {
                  respuesta: 'Respuesta 1 2',
                },
                {
                  respuesta: 'Respuesta 1 3',
                },
                {
                  respuesta: 'Respuesta 1 4',
                },
              ],
            },
          },
        ],
      },
    },
  })
}
