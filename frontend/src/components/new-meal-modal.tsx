import { zodResolver } from '@hookform/resolvers/zod'
import { Carrot, Pizza } from '@phosphor-icons/react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerMeal } from '@/api/register-meal'
import { queryClient } from '@/lib/react-query'

import { Button } from './ui/button'
import { DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'

const newMealFormSchema = z.object({
  title: z
    .string()
    .min(4, 'Por favor, insira um título com pelo menos 4 caracteres')
    .max(50, 'Por favor, insira um título mais curto'),
  amount: z
    .number({ message: 'Por favor, insira um número válido' })
    .min(0, 'O valor deve ser maior que zero')
    .max(999999, 'Por favor, insira um valor menor'),
  mealType: z.enum(['healthy', 'unhealthy']),
})

type NewMealFormInputs = z.infer<typeof newMealFormSchema>

export function NewMealModal() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<NewMealFormInputs>({
    resolver: zodResolver(newMealFormSchema),
  })

  const { mutateAsync: registerMealFn } = useMutation({
    mutationFn: registerMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
      toast.success('Refeição registrada com sucesso!')
    },
    onError: () => {
      toast.error('Ocorreu um erro inesperado. Tente novamente.')
    },
  })

  async function handleCreateNewMeal({
    amount,
    title,
    mealType,
  }: NewMealFormInputs) {
    try {
      await registerMealFn({
        title,
        amount,
        mealType,
      })

      reset()
    } catch {}
  }

  return (
    <DialogContent className="flex h-screen flex-col md:h-auto">
      <DialogHeader>
        <DialogTitle className="mb-1 md:mb-4">Nova Refeição</DialogTitle>
      </DialogHeader>

      <form
        className="space-y-6 md:space-y-4"
        onSubmit={handleSubmit(handleCreateNewMeal)}
      >
        <Input
          className={
            errors.title
              ? 'border-destructive focus-visible:ring-destructive'
              : ''
          }
          type="text"
          placeholder="Título"
          {...register('title')}
        />
        {errors.title && (
          <span className="text-destructive md:text-sm">
            {errors.title.message}
          </span>
        )}

        <Input
          className={
            errors.amount
              ? 'border-destructive focus-visible:ring-destructive'
              : ''
          }
          type="text"
          placeholder="Calorias"
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && (
          <span className="text-destructive md:text-sm">
            {errors.amount.message}
          </span>
        )}

        <Controller
          control={control}
          name="mealType"
          render={({ field }) => (
            <RadioGroup.Root
              className="grid grid-cols-2 gap-2 md:gap-3"
              onValueChange={field.onChange}
              value={field.value}
            >
              <RadioGroup.Item value="healthy" asChild>
                <Button
                  className={`flex items-center justify-center gap-2 ${errors.mealType && 'border border-destructive focus-visible:ring-destructive'} ${field.value === 'healthy' ? 'bg-success' : ''}`}
                  variant="ghost"
                  type="button"
                  disabled={isSubmitting}
                >
                  <Carrot
                    className={
                      field.value === 'healthy'
                        ? 'text-accent-foreground'
                        : 'text-success'
                    }
                    size={24}
                  />
                  Saudável
                </Button>
              </RadioGroup.Item>

              <RadioGroup.Item value="unhealthy" asChild>
                <Button
                  className={`flex items-center justify-center gap-2 ${errors.mealType && 'border border-destructive focus-visible:ring-destructive'} ${field.value === 'unhealthy' ? 'bg-destructive text-primary-foreground' : ''}`}
                  variant="ghost"
                  type="button"
                  disabled={isSubmitting}
                >
                  <Pizza
                    className={
                      field.value === 'unhealthy'
                        ? 'text-primary-foreground'
                        : 'text-destructive'
                    }
                    size={24}
                  />
                  Não Saudável
                </Button>
              </RadioGroup.Item>
            </RadioGroup.Root>
          )}
        />
        {errors.mealType && (
          <span className="text-destructive md:text-sm">
            {errors.mealType.message}
          </span>
        )}

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          Registrar
        </Button>
      </form>
    </DialogContent>
  )
}
