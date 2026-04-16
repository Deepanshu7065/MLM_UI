
import { NavList } from '@/components/Layout/NavList'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/home' })
  },
  component: RootComponent,
})


export function RootComponent() {
  return (
    <div>
      <NavList />
      <main className="p-6 flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}