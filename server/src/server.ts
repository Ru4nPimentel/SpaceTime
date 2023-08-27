import 'dotenv/config'

import fastify from 'fastify'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'
import { uploadRoutes } from './routes/upload'
import multipart from '@fastify/multipart'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import { resolve } from 'node:path'


const app = fastify()
// HTTP Method: GET, POST, PUT, PATCH

app.register(multipart) // ajuda o fastify a lidar com imagens e videos

app.register(require('@fastify/static'),{
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads'
}) // permite deixar a pasta publica para visualização de imagem

app.register(cors, {
  origin: true,
})

app.register(jwt, { //maneira de diferenciar os tokens gerados por outros backends
  secret: 'spacetime', //nome da string que você da para recuperar ou criptografar
})

app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

// API REST

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
