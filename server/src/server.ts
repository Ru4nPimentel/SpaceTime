import 'dotenv/config'

import fastify from 'fastify'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'


const app = fastify()
// HTTP Method: GET, POST, PUT, PATCH

app.register(cors, {
  origin: true,
})

app.register(jwt, { //maneira de diferenciar os tokens gerados por outros backends
  secret: 'spacetime', //nome da string que você da para recuperar ou criptografar
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
