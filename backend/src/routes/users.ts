import { compare, hash } from 'bcryptjs'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    '/register',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })

      const { name, email, password } = registerBodySchema.parse(request.body)

      const password_hash = await hash(password, 6)

      const userWithSameEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (userWithSameEmail) return reply.status(409).send()

      try {
        await prisma.user.create({
          data: {
            name,
            email,
            password_hash,
          },
        })
        return reply.status(201).send()
      } catch (err) {
        return reply.status(500).send({
          error: 'Internal Server Error',
          message: 'Could not create user. Please try again later.',
        })
      }
    },
  )

  app.post(
    '/authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
      })

      const { email, password } = authenticateBodySchema.parse(request.body)

      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) return reply.status(404).send()

      const doesPasswordMatches = await compare(password, user.password_hash)

      if (!doesPasswordMatches) return reply.status(401).send()

      const token = await reply.jwtSign(
        {},
        { sign: { sub: user.id, expiresIn: '1h' } },
      )

      return reply.status(200).send({ token })
    },
  )

  app.get('/me', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return reply.status(401).send({
          error: 'Token expired',
          message: 'Your token has expired. Please login again.',
        })
      }
      return reply.status(401).send({
        error: 'Unauthorized',
        message: 'Invalid token',
      })
    }

    const user = await prisma.user.findUnique({
      where: { id: request.user.sub },
      select: { id: true, name: true, email: true },
    })

    if (!user) {
      return reply.status(404).send({
        error: 'User not found',
        message: 'No user found with the provided token.',
      })
    }

    return reply.status(200).send({ user })
  })
}
