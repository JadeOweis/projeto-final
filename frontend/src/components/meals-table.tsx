import { MagnifyingGlass } from '@phosphor-icons/react'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

import { getMeals } from '@/api/get-meals'

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
            return (
              <TableRow key={meal.id}>
                <TableCell className="font-medium capitalize">
                  {meal.title}
                </TableCell>
                <TableCell
                  className={
                    meal.meal_type === 'healthy'
                      ? 'text-success'
                      : 'text-destructive'
                  }
                >
                  {meal.amount} kcal
                </TableCell>
                <TableCell
                  className={
                    meal.meal_type === 'healthy'
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
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
