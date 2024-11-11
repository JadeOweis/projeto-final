import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { getMeals } from '@/api/get-meals'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function Summary() {
  const { data: result } = useQuery({
    queryKey: ['meals'],
    queryFn: getMeals,
  })

  const data = [
    { name: 'Saudável', value: result?.summary.healthy },
    { name: 'Não Saudável', value: result?.summary.unhealthy },
  ]

  const COLORS = [colors.emerald[500], colors.red[500]]

  return (
    <>
      <section className="hidden w-full grid-cols-3 gap-4 md:grid">
        <Card className="flex flex-col justify-between gap-2">
          <CardHeader className="flex">
            <CardTitle>Saudáveis no mês</CardTitle>
            <CardDescription>
              <ArrowCircleUp className="h-8 w-8 fill-emerald-600" />
            </CardDescription>
          </CardHeader>
          <CardContent>{result?.summary.healthy} kcal</CardContent>
        </Card>

        <Card className="flex flex-col justify-between gap-2">
          <CardHeader className="flex">
            <CardTitle>Não Saudáveis no mês</CardTitle>
            <CardDescription>
              <ArrowCircleDown className="h-8 w-8 fill-destructive" />
            </CardDescription>
          </CardHeader>
          <CardContent>{result?.summary.unhealthy} kcal</CardContent>
        </Card>

        <Card className="flex flex-col justify-between gap-2">
          <CardHeader className="flex">
            <CardTitle>Total</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width={'100%'} height={110}>
              <PieChart style={{ fontSize: 12 }}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  innerRadius={35}
                  strokeWidth={6}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="stroke-background hover:opacity-80"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="flex items-center md:hidden">
        <Carousel className="mx-auto w-[70%]">
          <CarouselContent>
            <CarouselItem>
              <Card className="flex flex-col justify-between gap-2">
                <CardHeader className="flex">
                  <CardTitle>Saudáveis no mês</CardTitle>
                  <CardDescription>
                    <ArrowCircleUp className="h-8 w-8 fill-emerald-600" />
                  </CardDescription>
                </CardHeader>
                <CardContent>{result?.summary.healthy} kcal</CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="flex flex-col justify-between gap-2">
                <CardHeader className="flex">
                  <CardTitle>Não Saudáveis no mês</CardTitle>
                  <CardDescription>
                    <ArrowCircleDown className="h-8 w-8 fill-destructive" />
                  </CardDescription>
                </CardHeader>
                <CardContent>{result?.summary.unhealthy} kcal</CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="flex flex-col justify-between gap-2">
                <CardHeader className="flex">
                  <CardTitle className="text-white">Total</CardTitle>
                  <CardDescription>
                    <CurrencyDollar className="h-8 w-8 fill-white" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">0</CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </>
  )
}
