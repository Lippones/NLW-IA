import { Prisma, Prompt } from '@prisma/client'

export interface PromptRepository {
  create(data: Prisma.PromptUncheckedCreateInput): Promise<Prompt>
  findAll(): Promise<Prompt[]>
}
