import { PrismaVideoRepository } from '../../repositories/prisma/prisma-video-repository'
import { CreateTranscriptionUseCase } from '../create-transcription'

export function makeCreateTranscriptionUseCase() {
  const videoRepository = new PrismaVideoRepository()
  const sut = new CreateTranscriptionUseCase(videoRepository)

  return sut
}
