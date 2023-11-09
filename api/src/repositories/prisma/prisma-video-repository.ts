import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { VideoRepository } from '../video-repository'

export class PrismaVideoRepository implements VideoRepository {
  async create(data: Prisma.VideoUncheckedCreateInput) {
    const video = await prisma.video.create({
      data,
    })

    return video
  }

  async findById(id: string) {
    const video = await prisma.video.findUnique({
      where: {
        id,
      },
    })

    return video
  }

  async createTranscription({
    prompt,
    videoId,
  }: {
    videoId: string
    prompt: string
  }) {
    const transcription = await prisma.video.update({
      data: {
        transcription: prompt,
      },
      where: {
        id: videoId,
      },
    })

    return transcription
  }
}
