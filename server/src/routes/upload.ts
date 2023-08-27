import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'


//pipeline - permite aguardar o processo de upload/stream finalizar
//promisify transforma funçoes de nodes antigas em promise
const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_800, //5mb
      }
    })

    if(!upload) {
      return reply.status(400).send()
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/

    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if(!isValidFileFormat) {
      return reply.status(400).send()
    }

    const fileId = randomUUID()
    const extension = extname(upload.filename)

    const fileName = fileId.concat(extension) // mudando o nome do arquivo

    //resolve ele vai padronizar o caminho de todos os Sistemas operacionais

    const writeStream = createWriteStream(resolve(__dirname, '../../uploads/',fileName ))

    await pump(upload.file, writeStream)


    //lembrando que essa forma não e normal de guardar aquivo dentro do disco.
    //Amazon S3, GCS, cloudflare R2 - serviço para guardar dados

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return { fileUrl: fileUrl}
})
}
