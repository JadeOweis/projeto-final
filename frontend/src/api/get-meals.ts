import { api } from '@/lib/axios'

export interface GetMealsResponse {
  meals: {
    id: string
    title: string
    amount: number
    meal_type: 'healthy' | 'unhealthy'
    created_at: string
    user_id: string
    isExcludedFromBalance: boolean
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
    return { meals: [], summary: { healthy: 0, unhealthy: 0 } }
  }
}
