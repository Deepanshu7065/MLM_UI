import AllOrder from '@/components/Order/Orders'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/all-orders')({
  component: AllOrder,
})

