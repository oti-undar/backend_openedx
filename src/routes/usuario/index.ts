import { OpenAPIHono } from '@hono/zod-openapi'
import {
  uploadAvatarRoute,
  type AvatarUploadSchemaProps,
} from './docs/doc-upload-avatar.js'
import { getUsuarioRoute } from './docs/doc-get-usuario.js'
import { db } from '@/db/db.js'
import { guardarArchivo } from '@/helpers/guardar-archivo.js'

const usuario = new OpenAPIHono()

usuario.openapi(uploadAvatarRoute, async (c) => {
  const { id } = c.req.valid('param')
  const { avatar } = c.get('formDataValidated') as AvatarUploadSchemaProps
  try {
    const { file } = await guardarArchivo({
      archivo: avatar as File,
      path_file_sin_extension: `/examenes/avatar-${id}`,
    })

    await db.$transaction(async (prisma) => {
      return prisma.user.update({
        where: { id },
        data: { avatar: file },
      })
    })
    return c.json({ message: 'Avatar actualizado' }, 200)
  } catch (error) {
    return c.json({ error }, 409)
  }
})

usuario.openapi(getUsuarioRoute, async (c) => {
  const { id } = c.req.valid('param')
  try {
    const user = await db.$transaction(async (prisma) => {
      return prisma.user.findUnique({
        where: { id },
      })
    })
    if (!user) throw new Error('Usuario no encontrado')
    return c.json(user, 200)
  } catch (error) {
    return c.json({ error }, 409)
  }
})

export default usuario
