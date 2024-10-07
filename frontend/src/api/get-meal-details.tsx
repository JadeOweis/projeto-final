import { api } from '@/lib/axios'

export interface GetMealDetailsParams {
  mealId: string
}

export interface GetMealDetailsResponse {
  details: {
    id: string
    title: string
    amount: number
    meal_type: 'unhealthy' | 'healthy'
    created_at: string
    created_by: string
  }
}

export async function getMealDetails({ mealId }: GetMealDetailsParams) {
  const response = await api.get<GetMealDetailsResponse>(`/meals/${mealId}`)

  return response.data.details
}
