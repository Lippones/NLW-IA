import { Video } from '@prisma/client'
import { VideoRepository } from '../repositories/video-repository'
import { ResourceNotFoundError } from './erros/ResourceNotFound'
import { openai } from '../lib/openai'
import { createReadStream } from 'fs'
import 'dotenv/config'

interface CreateTranscriptionUseCaseRequest {
  videoId: string
  prompt: string
}
interface CreateTranscriptionUseCaseResponse {
  video: Video
}

export class CreateTranscriptionUseCase {
  constructor(private videoRepository: VideoRepository) {}

  async execute({
    videoId,
    prompt,
  }: CreateTranscriptionUseCaseRequest): Promise<CreateTranscriptionUseCaseResponse> {
    const videoFound = await this.videoRepository.findById(videoId)

    if (!videoFound) {
      throw new ResourceNotFoundError()
    }

    const audioReadStream = createReadStream(videoFound.path)

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: 'whisper-1',
      language: 'pt',
      prompt,
      response_format: 'json',
      temperature: 0,
    })

    const video = await this.videoRepository.createTranscription({
      prompt: response.text,
      videoId,
    })

    return {
      video,
    }
  }
}
