import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { PromptRepository } from '../prompt-repository'

export class PrismaPromptRepository implements PromptRepository {
  async findAll() {
    const prompts = await prisma.prompt.findMany()

    return prompts
  }

  async create(data: Prisma.PromptUncheckedCreateInput) {
    const prompts = await prisma.prompt.create({
      data,
    })

    return prompts
  }
}
