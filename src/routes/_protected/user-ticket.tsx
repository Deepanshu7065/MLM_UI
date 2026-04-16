import { UserTickets } from '@/components/contact/UserTicket'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/user-ticket')({
  component: UserTickets,
})
