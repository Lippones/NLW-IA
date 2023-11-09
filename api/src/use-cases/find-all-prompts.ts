import { Prompt } from '@prisma/client'
import { PromptRepository } from '../repositories/prompt-repository'

interface FindAllPromptsUseCaseResponse {
  prompts: Prompt[]
}

export class FindAllPromptsUseCase {
  constructor(private promptRepository: PromptRepository) {}

  async execute(): Promise<FindAllPromptsUseCaseResponse> {
    const prompts = await this.promptRepository.findAll()

    return {
      prompts,
    }
  }
}
