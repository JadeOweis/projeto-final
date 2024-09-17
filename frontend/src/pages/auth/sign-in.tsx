import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().min(1, 'Campo obrigatório').email('E-mail inválido'),
  password: z.string().min(1, 'Campo obrigatório'),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success('Login efetuado com sucesso')
      navigate('/')
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 404) {
        toast.error('E-mail não encontrado')
      } else if (error.response && error.response.status === 401) {
        toast.error('Credenciais inválidas')
      } else {
        toast.error('Houve um problema inesperado com seu cadastro')
      }
    },
  })

  async function handleSignIn({ email, password }: SignInForm) {
    await authenticate({ email, password })
  }

  return (
    <>
      <Helmet title="LogIn" />
      <section className="flex w-full max-w-md flex-col items-center justify-center gap-6 px-4 py-20">
        <article className="flex w-full flex-col justify-center gap-6">
          <div className="flex flex-col text-center md:gap-2">
            <h1 className="text-xl font-semibold tracking-tighter md:text-2xl">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe seu plano de dieta pelo painel
            </p>
          </div>
        </article>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div className="space-y-1 md:space-y-4">
            <Label
              htmlFor="email"
              className={errors.email && 'text-destructive'}
            >
              Seu e-mail
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className={
                errors.email
                  ? 'border-destructive focus-visible:ring-destructive'
                  : ''
              }
            />
            {errors.email && (
              <span className="px-2 text-sm text-destructive">
                {errors.email?.message}
              </span>
            )}
          </div>

          <div className="space-y-1 md:space-y-4">
            <Label
              htmlFor="password"
              className={errors.password && 'text-destructive'}
            >
              Sua senha
            </Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className={
                errors.password
                  ? 'border-destructive focus-visible:ring-destructive'
                  : ''
              }
            />
            {errors.password && (
              <span className="px-2 text-sm text-destructive">
                {errors.password?.message}
              </span>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Acessar painel
          </Button>
        </form>
        <span className="w-full text-center text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <Link to="/sign-up" className="text-primary hover:underline">
            Criar uma
          </Link>
        </span>
      </section>
    </>
  )
}
