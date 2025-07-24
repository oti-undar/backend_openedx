import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { docUi, openapiInfo } from './lib/doc-ui.js'
import examen from './routes/examen/index.js'

const app = new OpenAPIHono()

app.get('/', c => {
  return c.text('Hello Hono!')
})

app.route('/examen', examen)

app.get('/ui', c => c.html(docUi['Stoplight Elements']))
app.doc('/doc', openapiInfo)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  info => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
