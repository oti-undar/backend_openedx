import fs from 'fs'

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
  const path = `public${file}`

  await fs.promises.writeFile(path, buffer)

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
