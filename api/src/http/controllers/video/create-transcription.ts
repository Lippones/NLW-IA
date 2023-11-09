import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/erros/ResourceNotFound'
import { makeCreateTranscriptionUseCase } from '../../../use-cases/factories/make-create-transcription-use-case'

export async function createTranscription(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    videoId: z.string().uuid(),
  })
  const { videoId } = paramsSchema.parse(request.params)

  const bodySchema = z.object({
    prompt: z.string(),
  })

  const { prompt } = bodySchema.parse(request.body)

  const createTranscriptionUseCase = makeCreateTranscriptionUseCase()

  try {
    const { video } = await createTranscriptionUseCase.execute({
      prompt,
      videoId,
    })

    return reply.send(video)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: err.message,
      })
    }
    throw err
  }
}
