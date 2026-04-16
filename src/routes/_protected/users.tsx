
import { UsersApi } from '@/Apis/UsersApi/users.get';
import { queryClient } from '@/main';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/users')({
  loader: () => {
    return queryClient.ensureQueryData({
      queryKey: ["users"],
      queryFn: UsersApi.getUsers,
    })
  },
  component: RouteComponent,
})

function RouteComponent() {
 const data = Route.useLoaderData()

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users List</h2>

      <ul>
        {data?.data?.users?.map((user: any) => (
          <li key={user.id} className="py-1 border-b">
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
