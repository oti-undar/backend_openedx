import { Prisma } from '@prisma/client'

export const preguntaSchemaExample = {
  id: 4,
  title: '¿Cuál es la capital de Francia?',
  description: 'Pregunta sobre geografía europea',
  img: 'https://example.com/pregunta.jpg',
  video: 'https://example.com/pregunta.mp4',
  audio: 'https://example.com/pregunta.mp3',
  puntos: 1,
  duracion: Prisma.Decimal(30),
  examen_id: 4,
}
