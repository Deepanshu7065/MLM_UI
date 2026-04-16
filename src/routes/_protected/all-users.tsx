import AllUsersNetwork from '@/components/AllUsers/Allusers'
// import Allusers from '@/components/AllUsers/Allusers'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/all-users')({
  component: AllUsersNetwork,
})
