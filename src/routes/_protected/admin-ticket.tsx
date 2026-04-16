import { AdminTicketManager } from '@/components/contact/AdminTicketManage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin-ticket')({
  component: AdminTicketManager,
})