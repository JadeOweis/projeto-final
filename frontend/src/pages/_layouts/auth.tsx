import { Carrot } from '@phosphor-icons/react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen md:grid md:grid-cols-2">
      <header className="hidden h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground md:flex">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Carrot className="h-5 w-5 fill-primary" aria-label="Logo da Diet Plan" />

          <span className="font-medium text-xl">diet.plan</span>
        </div>
        <footer className="text-sm mt-auto">
          Gerencie seu plano de dieta &copy; diet.plan 🥕 - {new Date().getFullYear()}
        </footer>
      </header>

      <main className="flex flex-col items-center justify-center">
        <Outlet />
      </main>
    </div>
  )
}
