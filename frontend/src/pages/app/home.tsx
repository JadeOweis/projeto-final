import { Helmet } from 'react-helmet-async'

import { MealsTable } from '@/components/meals-table'
import { Summary } from '@/components/summary'

export function Home() {
  return (
    <>
      <Helmet title="Home" />
      <Summary />
      <MealsTable />
    </>
  )
}
