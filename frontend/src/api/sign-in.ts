import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInBody) {
  const response = await api.post('/users/authenticate', { email, password })

  const { token } = response.data
  localStorage.setItem('token', token)
}
