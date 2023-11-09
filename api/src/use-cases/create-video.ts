import { Video } from '@prisma/client'
import { VideoRepository } from '../repositories/video-repository'

interface CreateVideoUseCaseRequest {
  name: string
  path: string
  transcription?: string
}
interface CreateVideoUseCaseResponse {
  video: Video
}

export class CreateVideoUseCase {
  constructor(private videoRepository: VideoRepository) {}

  async execute({
    name,
    path,
    transcription,
  }: CreateVideoUseCaseRequest): Promise<CreateVideoUseCaseResponse> {
    const video = await this.videoRepository.create({
      name,
      path,
      transcription,
    })

    return {
      video,
    }
  }
}
