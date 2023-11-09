import { Prisma, Video } from '@prisma/client'

export interface VideoRepository {
  create(data: Prisma.VideoUncheckedCreateInput): Promise<Video>
  findById(id: string): Promise<Video | null>
  createTranscription(data: { videoId: string; prompt: string }): Promise<Video>
}
