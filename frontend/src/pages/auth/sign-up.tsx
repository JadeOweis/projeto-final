import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signUp } from '@/api/sign-up'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z
  .object({
    email: z.string().min(1, 'O e-mail é obrigatório').email('E-mail inválido'),
    name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z
      .string()
      .min(8, 'A confirmação da senha deve ter pelo menos 8 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  })

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  const { mutateAsync: registerUser } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success('Cadastro realizado com sucesso!',{
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        toast.error('Já existe um usuário com esse e-mail')
      } else {
        toast.error('Ocorreu um problema inesperado. Tente novamente mais tarde.')
      }
    },
  })

  async function handleSignUp({ name, email, password }: SignUpForm) {
    await registerUser({ name, email, password })
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <section className="flex w-full max-w-md flex-col items-center justify-center gap-6 px-4 py-20">
        <article className="flex w-full flex-col justify-center gap-6">
          <div className="flex flex-col text-center md:gap-2">
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Crie sua conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Comece a gerenciar seu plano de dieta com facilidade
            </p>
          </div>
        </article>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(handleSignUp)}
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
            <Label htmlFor="name" className={errors.name ? 'text-destructive' : ''}>
              Nome
            </Label>
            <Input
              id="name"
              type="text"
              {...register('name')}
              className={
                errors.name
                  ? 'border-destructive focus-visible:ring-destructive'
                  : ''
              }
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="px-2 text-sm text-destructive">
                {errors.name.message}
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
              <span id="password-error" className="px-2 text-sm text-destructive">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="space-y-1 md:space-y-4">
            <Label
              htmlFor="confirmPassword"
              className={errors.confirmPassword ? 'text-destructive' : ''}
            >
              Confirmar senha
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className={
                errors.confirmPassword
                  ? 'border-destructive focus-visible:ring-destructive'
                  : ''
              }
              aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            />
            {errors.confirmPassword && (
              <span id="confirmPassword-error" className="px-2 text-sm text-destructive">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Criar conta
          </Button>
        </form>
        <span className="w-full text-center text-sm text-muted-foreground">
          Já possui uma conta?{' '}
          <Link to="/sign-in" className="text-primary hover:underline">
            Faça login
          </Link>
        </span>
      </section>
    </>
  )
}
