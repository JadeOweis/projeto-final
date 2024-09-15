import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-accent-foreground">
        Voltar para a{' '}
        <Link to="/" className="text-primary">
          <Button variant={'ghost'} size={'sm'} className="p-1">
            home page
          </Button>
        </Link>
      </p>
    </div>
  )
}
