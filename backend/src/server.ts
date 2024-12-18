import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import fastify from 'fastify'

import { env } from './env'
import { mealsRoutes } from './routes/meals'
import { usersRoutes } from './routes/users'

const app = fastify()

app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.register(cors, {
  origin: env.CLIENT_ORIGIN,
  methods: ['POST', 'PATCH'],
  credentials: true,
})

app.register(cookie)
app.register(usersRoutes, { prefix: 'users' })
app.register(mealsRoutes, { prefix: 'meals' })

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!')
  })
