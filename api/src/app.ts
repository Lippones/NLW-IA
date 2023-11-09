import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env/env'
import { promptRoutes } from './http/controllers/prompt/routes'
import { homeRoutes } from './http/controllers/home'
import { videoRoutes } from './http/controllers/video/routes'
import { fastifyMultipart } from '@fastify/multipart'
import { fastifyCors } from '@fastify/cors'

export const app = fastify({
  // logger: true,
})

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifyMultipart, {
  limits: {
    fileSize: 1_048_576 * 25, // 25m
  },
})

app.register(promptRoutes, {
  prefix: '/api',
})
app.register(homeRoutes, {
  prefix: '/api',
})
app.register(videoRoutes, {
  prefix: '/api',
})

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO: Usar alguma ferramenta de log
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
