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
      <TableCaption>Lista de suas refeições recentes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="md:w-1/3">Título</TableHead>
          <TableHead>Calorias</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Data</TableHead>
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
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
