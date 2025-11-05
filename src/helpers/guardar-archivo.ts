import fs from 'fs'
import path from 'path'

export async function guardarArchivo({
  archivo,
  path_file_sin_extension,
}: {
  archivo: File
  path_file_sin_extension: string
}) {
  const arrayBuffer = await archivo.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const extension = '.' + archivo.type.split('/')[1]
  const file = `${path_file_sin_extension}${extension}`
  const fullPath = path.join('public', file)

  await fs.promises.mkdir(path.dirname(fullPath), { recursive: true })

  await fs.promises.writeFile(fullPath, buffer)

  const tipoMime = archivo.type.split('/')[0]
  const tipo: 'img' | 'audio' | 'video' | null =
    tipoMime === 'image'
      ? 'img'
      : tipoMime === 'audio'
      ? 'audio'
      : tipoMime === 'video'
      ? 'video'
      : null

  return { file, tipo }
}
