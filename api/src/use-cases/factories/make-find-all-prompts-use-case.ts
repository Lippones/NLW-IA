import { PrismaPromptRepository } from '../../repositories/prisma/prisma-prompt-repository'
import { FindAllPromptsUseCase } from '../find-all-prompts'

export function makeFindAllPromptsUseCase() {
  const promptRepository = new PrismaPromptRepository()
  const sut = new FindAllPromptsUseCase(promptRepository)

  return sut
}
