import UserOrder from '@/components/Order/userOrder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/orders')({
  component: UserOrder,
})

