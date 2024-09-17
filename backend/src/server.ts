import cors from '@fastify/cors'
import fastify from 'fastify'

import { env } from './env'
import { usersRoutes } from './routes/users'

const app = fastify()

app.register(cors, {
  origin: env.CLIENT_ORIGIN,
  methods: ['POST'],
  credentials: true,
})

app.register(usersRoutes, { prefix: 'users' })

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!')
  })
