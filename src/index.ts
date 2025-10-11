import { OpenAPIHono } from '@hono/zod-openapi'
import { docUi, openapiInfo } from './lib/doc-ui.js'
import examen from './routes/examen/index.js'
import { serveStatic } from '@hono/node-server/serve-static'
import { cors } from 'hono/cors'
import curso from './routes/curso/index.js'
import state from './routes/state/index.js'
import rubrica from './routes/rubrica/index.js'
import apiOpenEdx from './routes/api_open_edx/index.js'
import ejecucion_examen from './routes/ejecucion-examen/index.js'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { db } from './db/db.js'
import { createEjecucionExamen } from './routes/ejecucion-examen/utils/create-ejecucion-examen.js'
import { StateType } from '@prisma/client'

interface NodeRequestInit extends RequestInit {
  duplex?: 'half'
}

const server = createServer(async (req, res) => {
  const url = `http://${req.headers.host}${req.url}`

  const init: NodeRequestInit = {
    method: req.method,
    headers: req.headers as any,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req as any // Node IncomingMessage es Readable
    init.duplex = 'half' // 👈 obligatorio cuando hay body stream
  }

  const request = new Request(url, init)

  const response = await app.fetch(request)

  res.writeHead(response.status, Object.fromEntries(response.headers))

  if (response.body) {
    const reader = response.body.getReader()
    const push = async () => {
      const { done, value } = await reader.read()
      if (done) {
        res.end()
        return
      }
      res.write(value)
      push()
    }
    push()
  } else {
    res.end()
  }
})

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', socket => {
  socket.on('init-examen', data => socket.emit('init-examen', data))

  socket.on('join_room', room => {
    socket.join(room)
    console.log(`Socket ${socket.id} se unió a la sala ${room}`)
  })

  socket.on('message_room', async ({ room, event, data = {} }) => {
    if (event === 'init-examen') {
      await db.$transaction(async prisma => {
        const { pregunta_actual_sync_id, examen_id, user_id } = data
        const examen = await prisma.examen.findUnique({
          where: {
            id: examen_id,
          },
          select: {
            curso: {
              select: {
                usuarios: {
                  where: {
                    user: {
                      id: { not: user_id },
                    },
                  },
                  select: {
                    user_id: true,
                  },
                },
              },
            },
          },
        })
        const alumnos =
          examen?.curso.usuarios.map(usuario => usuario.user_id) || []

        const ejecuciones = await Promise.all(
          alumnos.map(async alumnoId => {
            const ejecucion = await createEjecucionExamen({
              item: {
                user_id: alumnoId,
                examen_id,
                pregunta_id: pregunta_actual_sync_id,
              },
              prisma,
            })

            return {
              alumno_id: alumnoId,
              pregunta_ejecucion_actual_id:
                ejecucion.pregunta_ejecucion_actual_id,
            }
          })
        )

        data.ejecucionesExamen = ejecuciones
      })
    }

    if (event === 'examen-siguiente-pregunta') {
      const { examen_id, siguiente_pregunta_id } = data
      const ejecuciones = await siguientePreguntaExamen(
        examen_id,
        siguiente_pregunta_id
      )
      data.ejecucionesExamen = ejecuciones
    }

    if (event === 'finalizar-examen') {
      const { examen_id } = data
      finalizarExamen(examen_id)
    }

    io.to(room).emit(event, data)
  })
})
export { io }

type Job = {
  id: string
  timeout: NodeJS.Timeout
  runAt: Date
  callback: () => void
}

export const jobs = new Map<string, Job>()

import { createJob, listJobs } from './helpers/jobs.js'
import {
  empezarJobExamen,
  finalizarJobExamen,
} from './routes/examen/helpers/finalizar-job-examen.js'
import { siguientePreguntaExamen } from './routes/examen/helpers/siguiente-pregunta-examen.js'
import { finalizarExamen } from './routes/examen/helpers/finalizar-examen.js'
;(async () => {
  const examenes = await db.examen.findMany({
    where: {
      state: {
        OR: [{ name: StateType.Disponible }, { name: StateType.Activo }],
      },
      OR: [
        {
          final_examen: {
            not: null,
          },
        },
        {
          inicio_examen: {
            not: null,
          },
        },
      ],
    },
    select: {
      id: true,
      final_examen: true,
      inicio_examen: true,
    },
  })

  examenes.forEach(examen => {
    if (examen.final_examen)
      createJob(examen.id, examen.final_examen, async () => {
        finalizarJobExamen(examen.id)
      })
    if (examen.inicio_examen)
      createJob(examen.id + 'inicio', examen.inicio_examen, async () => {
        empezarJobExamen(examen.id)
      })
  })
})()

const app = new OpenAPIHono()
app.use('*', cors())

app.get('/', c => {
  return c.text('Hello Hono!')
})

app.route('/examen', examen)
app.route('/rubrica', rubrica)
app.route('/curso', curso)
app.route('/state', state)
app.route('/api_open_edx', apiOpenEdx)
app.route('/ejecucion_examen', ejecucion_examen)

app.get('/ui', c => c.html(docUi['Stoplight Elements']))
app.doc('/doc', openapiInfo)

app.use('*', serveStatic({ root: './public' }))

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
