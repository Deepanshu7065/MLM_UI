import ReferralTreeView from '@/components/MyUsers/Users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/myusers')({
  component: ReferralTreeView,
})

