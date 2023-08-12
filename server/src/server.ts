import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'

const app = fastify()
// HTTP Method: GET, POST, PUT, PATCH

app.register(cors, {
  origin: true,
})

app.register(memoriesRoutes)

// API REST

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
