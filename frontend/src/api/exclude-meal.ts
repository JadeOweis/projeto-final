import { api } from '@/lib/axios'

export interface ExcludeMealParams {
  mealId: string
}

export async function excludeMeal({ mealId }: ExcludeMealParams) {
  await api.patch(`/meals/${mealId}/exclude`)
}
