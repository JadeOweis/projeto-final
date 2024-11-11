import { api } from '@/lib/axios'

export interface GetMealsResponse {
  meals: {
    id: string
    title: string
    amount: number
    meal_type: 'healthy' | 'unhealthy'
    created_at: string
    user_id: string
  }[]
  summary: {
    healthy: number
    unhealthy: number
  }
}

export async function getMeals(): Promise<GetMealsResponse> {
  try {
    const response = await api.get<GetMealsResponse>('/meals')

    return response.data
  } catch {
    return { meals: [] }
  }
}
