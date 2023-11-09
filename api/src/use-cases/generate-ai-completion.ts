import { Video } from '@prisma/client'
import { VideoRepository } from '../repositories/video-repository'
import { ResourceNotFoundError } from './erros/ResourceNotFound'
import { openai } from '../lib/openai'
import 'dotenv/config'

interface GenerateAiCompletionUseCaseRequest {
  videoId: string
  template: string
  temperature: number
}
interface GenerateAiCompletionUseCaseResponse {
  response: string
}

export class GenerateAiCompletionUseCase {
  constructor(private promptRepository: VideoRepository) {}

  async execute({
    temperature,
    template,
    videoId,
  }: GenerateAiCompletionUseCaseRequest): Promise<GenerateAiCompletionUseCaseResponse> {
    const videoFound = await this.promptRepository.findById(videoId)

    if (!videoFound?.transcription) {
      throw new ResourceNotFoundError()
    }

    const promptMessage = template.replace(
      '{transcription}',
      videoFound.transcription,
    )

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature,
      messages: [
        {
          role: 'user',
          content: promptMessage,
        },
      ],
    })

    return {
      response,
    }
  }
}
