import { Helmet } from 'react-helmet-async'

import { MealsTable } from '@/components/meals-table'

export function Home() {
  return (
    <>
      <Helmet title="Home" />
      <MealsTable />
    </>
  )
}
