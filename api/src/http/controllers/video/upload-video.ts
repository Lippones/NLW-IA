import { FastifyReply, FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import fs from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { makeCreateVideoUseCase } from '../../../use-cases/factories/make-create-video-use-case '

export async function uploadVideo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = await request.file()

  if (!data) {
    return reply.status(400).send({ error: 'Missing file input.' })
  }

  const extension = path.extname(data.filename)

  if (extension !== '.mp3') {
    return reply
      .status(400)
      .send({ error: 'Invalid input type, please upload a MP3' })
  }

  // TODO: Usar algum serviço de upload com o S3

  const fileBaseName = path.basename(data.filename, extension)

  const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

  const uploadDestination = path.resolve(
    __dirname,
    '../../../../tmp',
    fileUploadName,
  )

  await pipeline(data.file, fs.createWriteStream(uploadDestination))

  const createVideoUseCase = makeCreateVideoUseCase()

  const { video } = await createVideoUseCase.execute({
    name: data.filename,
    path: uploadDestination,
  })

  return reply.send(video)
}
