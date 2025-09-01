import { TipoExamen } from '@prisma/client'

export const examenSchemaExample = {
  id: '620e4567-e89b-12d3-a456-426614174000',
  title: 'Examen de prueba',
  description: 'Descripción del examen',
  img: 'https://example.com/img.jpg',
  video: 'https://example.com/video.mp4',
  audio: 'https://example.com/audio.mp3',
  peso: 1,
  user_id: '4',
  curso_id: '620e4567-e89b-12d3-a456-426614174000',
  inicio_examen: new Date(),
  final_examen: new Date(),
  tipo_examen: TipoExamen.Async,
  state_id: 1,
  rubrica_holistica_id: null,
  rubrica_analitica_id: null,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: new Date(),
}
