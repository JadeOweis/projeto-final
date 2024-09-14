import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignIn() {
  return (
    <>
      <Helmet title="LogIn" />
      <section className="w-full max-w-md p-4 md:p-8">
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

        <form className="flex flex-col gap-2 md:gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Sua senha</Label>
            <Input id="password" type="password" />
          </div>

          <Button type="submit">Acessar painel</Button>
        </form>
      </section>
    </>
  )
}
