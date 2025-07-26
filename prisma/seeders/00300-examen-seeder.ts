import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function examenSeeder() {
  await prisma.examen.create({
    data: {
      id: 'a425ae58-e6d6-42c5-b01c-cc6858054acc',
      title: 'Prueba de Examen Armonia',
      user_id: '123e4567-e89b-12d3-a456-426614174000',
      curso_id: '620e4567-e89b-12d3-a456-426614174000',
      inicio_examen: '2025-05-23T21:54:05.000Z',
      state_id: 3,
      preguntas: {
        create: [
          {
            title: 'Marque el tipo de error en el siguiente enlace armónico',
            img: '/examenes/preguntas/armonia-pregunta-1.jpg',
            respuestas: {
              create: [
                {
                  respuesta: 'Saltos mayores a una octava',
                },
                {
                  respuesta: 'Quintas y octavas paralelas',
                  correcta: true,
                },
                {
                  respuesta: 'Quinta paralela oculta',
                },
                {
                  respuesta: 'Superposición de voces',
                },
              ],
            },
          },
          {
            title: 'Marque el tipo de error en el siguiente enlace armónico',
            img: '/examenes/preguntas/armonia-pregunta-2.jpg',
            respuestas: {
              create: [
                {
                  respuesta: 'Saltos mayores a una octava',
                },
                {
                  respuesta: 'Quintas y octavas paralelas',
                },
                {
                  respuesta: 'Quinta paralela oculta',
                  correcta: true,
                },
                {
                  respuesta: 'Superposición de voces',
                },
              ],
            },
          },
          {
            title: 'Marque el tipo de error en el siguiente enlace armónico',
            img: '/examenes/preguntas/armonia-pregunta-3.jpg',
            respuestas: {
              create: [
                {
                  respuesta: 'Saltos mayores a una octava',
                },
                {
                  respuesta: 'Resolución de sensible',
                  correcta: true,
                },
                {
                  respuesta: 'Quinta paralela oculta',
                },
                {
                  respuesta: 'Superposición de voces',
                },
              ],
            },
          },
          {
            title: 'Marque el tipo de error en el siguiente enlace armónico',
            img: '/examenes/preguntas/armonia-pregunta-4.jpg',
            respuestas: {
              create: [
                {
                  respuesta:
                    'Intervalo melódico prohibido en dos intervalos continuos consecutivos',
                  correcta: true,
                },
                {
                  respuesta: 'Resolución de sensible',
                },
                {
                  respuesta: 'Quinta paralela oculta',
                },
                {
                  respuesta: 'Superposición de voces',
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
      id: '5e4c77a4-9c3f-4c5e-99c2-5c8e6f4e7c8f',
      title: 'Prueba de Examen Recursos TIC',
      user_id: '123e4567-e89b-12d3-a456-426614174000',
      curso_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      inicio_examen: '2025-05-24T15:17:02.000Z',
      state_id: 3,
      preguntas: {
        create: [
          {
            title:
              'Seleccione la alternativa que corresponde con la configuración de un podcast de la herramienta TIC Openboard',
            respuestas: {
              create: [
                {
                  respuesta: 'Alternativa A',
                  img: '/examenes/preguntas/respuestas/tic-pregunta-1-alternativa-1.gif',
                },
                {
                  respuesta: 'Alternativa B',
                  img: '/examenes/preguntas/respuestas/tic-pregunta-1-alternativa-2.gif',
                  correcta: true,
                },
                {
                  respuesta: 'Alternativa C',
                  img: '/examenes/preguntas/respuestas/tic-pregunta-1-alternativa-3.gif',
                },
                {
                  respuesta: 'Alternativa D',
                  img: '/examenes/preguntas/respuestas/tic-pregunta-1-alternativa-4.gif',
                },
              ],
            },
          },
        ],
      },
    },
  })
}
