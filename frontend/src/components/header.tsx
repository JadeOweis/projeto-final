import { Carrot } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { NewMealModal } from './new-meal-modal'
import { ModeToggle } from './theme/mode-toggle'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'

export function Header() {
  const navigate = useNavigate()

  function handleSignOut() {
    localStorage.removeItem('token')

    navigate('/sign-in', { replace: true })
    toast.success('Você saiu da conta com sucesso!')
  }

  return (
    <header className="w-screen bg-muted-foreground py-12 dark:bg-muted md:py-32">
      <nav className="flex w-full items-center justify-between px-4 md:container md:w-[90%] lg:w-2/3">
        <Carrot
          className="h-6 w-6 fill-primary md:h-10 md:w-10"
          aria-label="Logo da Marca"
        />

        <div className="ml-auto flex items-center justify-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Registrar Refeição</Button>
            </DialogTrigger>
            <NewMealModal />
          </Dialog>
          <ModeToggle />
          <Button onClick={handleSignOut} variant={'secondary'}>
            Sair
          </Button>
        </div>
      </nav>
    </header>
  )
}
