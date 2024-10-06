import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="min-h-screen w-screen bg-card font-sans">
      <Header />

      {/* <main className="-mt-8 flex w-full flex-col px-1 md:container md:-mt-14 md:w-[90%] md:space-y-12 lg:-mt-20 lg:w-2/3"> */}
      <main className="flex w-full flex-col px-1 md:container md:w-[90%] md:space-y-12 lg:w-2/3">
        <Outlet />
      </main>
    </div>
  )
}
