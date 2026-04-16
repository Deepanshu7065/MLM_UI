import { NavList } from '@/components/Layout/NavList'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  beforeLoad: () => {
    const auth = localStorage.getItem("token") || "";
    if (auth) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="">
        <NavList />
        <main className="flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
