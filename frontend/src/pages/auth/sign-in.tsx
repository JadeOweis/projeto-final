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
  email: z.string().min(1, 'O e-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(1, 'A senha é obrigatória'),
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
      toast.success('Login realizado com sucesso!')
      navigate('/')
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        toast.error('E-mail não encontrado')
      } else if (error.response?.status === 401) {
        toast.error('Credenciais inválidas')
      } else {
        toast.error(
          'Ocorreu um problema inesperado. Tente novamente mais tarde.',
        )
      }
    },
  })

  async function handleSignIn({ email, password }: SignInForm) {
    await authenticate({ email, password })
  }

  return (
    <>
      <Helmet title="Login" />
      <section className="flex w-full max-w-md flex-col items-center justify-center gap-6 px-4 py-20">
        <article className="flex w-full flex-col justify-center gap-6">
          <div className="flex flex-col text-center md:gap-2">
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Acessar o Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Gerencie seu plano de dieta com facilidade
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
              className={errors.email ? 'text-destructive' : ''}
            >
              E-mail
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
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="px-2 text-sm text-destructive">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-1 md:space-y-4">
            <Label
              htmlFor="password"
              className={errors.password ? 'text-destructive' : ''}
            >
              Senha
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
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <span
                id="password-error"
                className="px-2 text-sm text-destructive"
              >
                {errors.password.message}
              </span>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Acessar o Painel
          </Button>
        </form>
        <span className="w-full text-center text-sm text-muted-foreground">
          Não possui uma conta?{' '}
          <Link to="/sign-up" className="text-primary hover:underline">
            Crie uma aqui
          </Link>
        </span>
      </section>
    </>
  )
}
