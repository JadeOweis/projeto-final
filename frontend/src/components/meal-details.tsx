import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { getMealDetails } from '@/api/get-meal-details'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Table, TableBody, TableCell, TableRow } from './ui/table'

interface MealDetailsProps {
  mealId: string
  open: boolean
}

export function MealDetails({ mealId, open }: MealDetailsProps) {
  const { data: meal } = useQuery({
    queryKey: ['meal', mealId],
    queryFn: () => getMealDetails({ mealId }),
    enabled: open,
  })

  return (
    <DialogContent className="flex h-screen flex-col pt-14 md:h-auto">
      <DialogHeader>
        <DialogTitle>ID da Refeição: {mealId}</DialogTitle>
        <DialogDescription>Detalhes da Refeição</DialogDescription>
      </DialogHeader>

      {meal && (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Título</TableCell>
                <TableCell className="flex justify-end capitalize">
                  {meal.title}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Categoria
                </TableCell>
                <TableCell className="flex justify-end capitalize">
                  {meal.meal_type === 'healthy' ? 'Saudável' : 'Não Saudável'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Amount</TableCell>
                <TableCell className="flex justify-end capitalize">
                  {meal.amount} kcal
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Data</TableCell>
                <TableCell className="flex justify-end capitalize">
                  {format(new Date(meal.created_at), 'MM/dd/yyyy hh:mm:ss a')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Criado por
                </TableCell>
                <TableCell className="flex justify-end capitalize">
                  {meal.created_by}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </DialogContent>
  )
}
