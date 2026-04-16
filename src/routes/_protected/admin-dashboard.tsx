import AdminDashboard from '@/components/adminDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin-dashboard')({
  component: AdminDashboard,
})

