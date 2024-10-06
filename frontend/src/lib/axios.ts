import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      const navigate = useNavigate()

      navigate('/sign-in', { replace: true })
      toast.info('Você foi deslogado por inatividade')
    }
    return Promise.reject(error)
  },
)
