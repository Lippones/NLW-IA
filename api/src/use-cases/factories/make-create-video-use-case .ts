import { PrismaVideoRepository } from '../../repositories/prisma/prisma-video-repository'
import { CreateVideoUseCase } from '../create-video'

export function makeCreateVideoUseCase() {
  const videoRepository = new PrismaVideoRepository()
  const sut = new CreateVideoUseCase(videoRepository)

  return sut
}
