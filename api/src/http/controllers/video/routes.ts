import { FastifyInstance } from 'fastify'
import { uploadVideo } from './upload-video'
import { createTranscription } from './create-transcription'

export async function videoRoutes(app: FastifyInstance) {
  app.post('/videos', uploadVideo)
  app.post('/videos/:videoId/transcription', createTranscription)
}
