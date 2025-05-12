import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { db } from './db/db.js'

const app = new Hono()

app.get('/', c => {
  return c.text('Hello Hono!')
})

app.get('/users', async c => {
  const users = await db.usuario.findMany()
  return c.json(users)
})

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  info => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
