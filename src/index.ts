import { serve } from '@hono/node-server'
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

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  info => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
