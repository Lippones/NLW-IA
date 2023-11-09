import { FastifyInstance } from 'fastify'
import { getPrompts } from './get-prompts'
import { generateAiCompletions } from './generateAiCompletions'

export async function promptRoutes(app: FastifyInstance) {
  app.get('/prompts', getPrompts)
  app.post('/ai/complete', generateAiCompletions)
}
