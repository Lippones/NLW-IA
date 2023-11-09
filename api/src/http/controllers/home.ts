import { FastifyInstance } from 'fastify'

export async function homeRoutes(app: FastifyInstance) {
  app.get('/', async (_req, reply) => {
    reply.send({ message: 'Hello world' })
  })
}
