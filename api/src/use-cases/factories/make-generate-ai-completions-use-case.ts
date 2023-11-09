import { PrismaVideoRepository } from '../../repositories/prisma/prisma-video-repository'
import { GenerateAiCompletionUseCase } from '../generate-ai-completion'

export function makeGenerateAiCompletionUseCase() {
  const videoRepository = new PrismaVideoRepository()
  const sut = new GenerateAiCompletionUseCase(videoRepository)

  return sut
}
