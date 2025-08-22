import { Prisma } from '@prisma/client'

export const preguntaSchemaExample = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  title: '¿Cuál es la capital de Francia?',
  description: 'Pregunta sobre geografía europea',
  img: 'https://example.com/pregunta.jpg',
  video: 'https://example.com/pregunta.mp4',
  audio: 'https://example.com/pregunta.mp3',
  puntos: 1,
  duracion: Prisma.Decimal(30),
  inicio_pregunta: new Date(),
  examen_id: '123e4567-e89b-12d3-a456-426614174000',
}
