import 'dotenv/config'

import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import { authRoutes } from './routes/auth'

const app = fastify()
// HTTP Method: GET, POST, PUT, PATCH

app.register(cors, {
  origin: true,
})

app.register(authRoutes)
app.register(memoriesRoutes)

// API REST

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
