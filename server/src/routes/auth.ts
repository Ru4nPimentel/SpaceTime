import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { log } from 'console'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null, // corpo da requisição nesse caso nada
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json', // informa qual e o formato do retorno
        },
      },
    )

    const { access_token } = accessTokenResponse.data

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userResponse = await axios.get('https://api.github.com/user', {
      headers:{
        Authorization: `Bearer ${access_token}`, //autorização
      }
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where:{
        githubID: userInfo.id,
      }
    })

    if(!user) {
     user = await prisma.user.create({
      data: {
        githubID : userInfo.id,
        login: userInfo.login,
        name: userInfo.name,
        avatarUrl : userInfo.avatar_url
      }
     })
    }

    const token = app.jwt.sign({
      name: user.name, // dados publicos
      avatarUrl : user.avatarUrl //dados publicos
    }, {
      sub: user.id, //id para indentificar o usuario
      expiresIn: '30 days' // quantidade de tempo para permanecer logado
    })

    return {
      token
    }
  })
}
