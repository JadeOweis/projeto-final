import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '../lib/prisma'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      return reply.status(401).send()
    }

    const user = await prisma.user.findUnique({
      where: { id: request.user.sub },
      select: { id: true, name: true, email: true },
    })

    if (!user) {
      return reply.status(401).send()
    }

    const createMealBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      mealType: z.enum(['healthy', 'unhealthy']),
    })

    const { amount, mealType, title } = createMealBodySchema.parse(request.body)

    await prisma.meal.create({
      data: { amount, meal_type: mealType, title, user_id: user.id },
    })

    return reply.status(201).send()
  })
}
