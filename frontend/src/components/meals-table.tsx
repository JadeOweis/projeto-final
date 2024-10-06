import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getMeals } from '@/api/get-meals'

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
  const { data: result } = useQuery({
    queryKey: ['meals'],
    queryFn: getMeals,
  })

  return (
    <Table>
      <TableCaption>Uma lista de suas refeições recentes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="md:w-1/2">Título</TableHead>
          <TableHead>Quantidade de calorias</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Tipo</TableHead>
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
                  {meal.amount}
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(meal.created_at, {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell
                  className={
                    meal.meal_type === 'healthy'
                      ? 'text-success'
                      : 'text-destructive'
                  }
                >
                  {meal.meal_type}
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
