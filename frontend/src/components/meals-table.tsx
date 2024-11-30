import { MagnifyingGlass, Trash } from '@phosphor-icons/react'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { toast } from 'sonner'

import { excludeMeal } from '@/api/exclude-meal'
import { getMeals } from '@/api/get-meals'
import { queryClient } from '@/lib/react-query'

import { MealDetails } from './meal-details'
import { Button } from './ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export function MealsTable() {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)

  const { data: result } = useQuery({
    queryKey: ['meals'],
    queryFn: getMeals,
  })

  const { mutateAsync: excludeFromBalance } = useMutation({
    mutationFn: excludeMeal,
    onSuccess: () => {
      toast.success('Refeição retirada do resumo com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['meals'] })
    },
    onError: () => {
      toast.error('Ocorreu um problema inesperado. Tente novamente mais tarde.')
    },
  })

  async function handleDeleteFromSummary(mealId: string) {
    await excludeFromBalance({ mealId })
  }

  return (
    <Table>
      <TableCaption>Lista de suas refeições recentes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="md:w-1/3">Título</TableHead>
          <TableHead>Calorias</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {result &&
          result.meals.map((meal) => {
            const isInSummary = meal.isExcludedFromBalance

            return (
              <TableRow key={meal.id}>
                <TableCell
                  className={`font-medium capitalize ${isInSummary && 'text-muted-foreground line-through'}`}
                >
                  {meal.title}
                </TableCell>
                <TableCell
                  className={
                    isInSummary
                      ? 'text-muted-foreground line-through'
                      : meal.meal_type === 'healthy'
                        ? 'text-success'
                        : 'text-destructive'
                  }
                >
                  {meal.amount} kcal
                </TableCell>
                <TableCell
                  className={
                    isInSummary
                      ? 'text-muted-foreground line-through'
                      : meal.meal_type === 'healthy'
                        ? 'text-success'
                        : 'text-destructive'
                  }
                >
                  {meal.meal_type === 'healthy' ? 'Saudável' : 'Não Saudável'}
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(meal.created_at, {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2 font-medium">
                  <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={'outline'}
                        size={'sm'}
                        className="lg:flex lg:items-center lg:justify-center lg:gap-1"
                      >
                        <MagnifyingGlass className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden lg:flex">Detalhes</span>
                      </Button>
                    </DialogTrigger>

                    <MealDetails mealId={meal.id} open={isDetailsOpen} />
                  </Dialog>

                  <Button
                    variant={'outline'}
                    size={'sm'}
                    className="lg:flex lg:items-center lg:justify-center lg:gap-1"
                    onClick={() => handleDeleteFromSummary(meal.id)}
                  >
                    <Trash className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden lg:flex">Excluir</span>
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
