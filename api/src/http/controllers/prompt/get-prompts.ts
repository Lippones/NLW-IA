import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFindAllPromptsUseCase } from '../../../use-cases/factories/make-find-all-prompts-use-case'

export async function getPrompts(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const findAllPromptsUseCase = makeFindAllPromptsUseCase()

  const { prompts } = await findAllPromptsUseCase.execute()

  reply.send(prompts)
}
