import { api } from '@/lib/axios'

interface RegisterTransactionBody {
  title: string
  amount: number
  mealType: 'healthy' | 'unhealthy'
}

export async function registerMeal({
  title,
  amount,
  mealType,
}: RegisterTransactionBody) {
  await api.post('/meals', { title, amount, mealType })
}
