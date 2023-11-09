import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGenerateAiCompletionUseCase } from '../../../use-cases/factories/make-generate-ai-completions-use-case'
import { ResourceNotFoundError } from '../../../use-cases/erros/ResourceNotFound'

export async function generateAiCompletions(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    videoId: z.string().uuid(),
    template: z.string(),
    temperature: z.coerce.number().min(0).max(1).default(0.5),
  })

  const { temperature, template, videoId } = bodySchema.parse(request.body)

  const generateAiCompletionUseCase = makeGenerateAiCompletionUseCase()

  try {
    const { response } = await generateAiCompletionUseCase.execute({
      temperature,
      template,
      videoId,
    })

    return reply.send(response)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.send({
        message: err.message,
      })
    }

    throw err
  }
}
