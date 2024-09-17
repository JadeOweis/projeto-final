import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signUp } from '@/api/sign-up'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z
  .object({
    email: z.string().min(1, 'Campo obrigatório').email('E-mail inválido'),
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
      toast.success('Cadastro efetuado com sucesso')
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 409) {
        toast.error('Já existe um usuário com esse e-mail')
      } else {
        toast.error('Houve um problema inesperado com seu cadastro')
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
            <h1 className="text-xl font-semibold tracking-tighter md:text-2xl">
              Criar conta grátis{' '}
            </h1>
            <p className="text-sm text-muted-foreground">
              Comece a Registrar seu plano de dieta pelo painel
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
            <Label htmlFor="name" className={errors.name && 'text-destructive'}>
              Seu nome
            </Label>
            <Input
              id="name"
              type="name"
              {...register('name')}
              className={
                errors.name
                  ? 'border-destructive focus-visible:ring-destructive'
                  : ''
              }
            />
            {errors.name && (
              <span className="px-2 text-sm text-destructive">
                {errors.name?.message}
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

          <div className="space-y-1 md:space-y-4">
            <Label
              htmlFor="confirmPassword"
              className={errors.confirmPassword && 'text-destructive'}
            >
              Confirme sua senha
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
            />
            {errors.confirmPassword && (
              <span className="px-2 text-sm text-destructive">
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Começar a registrar dieta
          </Button>
        </form>
        <span className="w-full text-center text-sm text-muted-foreground">
          Já tenho uma conta.{' '}
          <Link to="/sign-in" className="text-primary hover:underline">
            Acessar
          </Link>
        </span>
      </section>
    </>
  )
}
