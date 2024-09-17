import { hash } from 'bcryptjs'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    const password_hash = await hash(password, 6)

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    })

    return reply.status(201).send()
  })
}
