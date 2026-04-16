
import AllPayments from '@/components/CheckStatus/AllPayment'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/payments')({
  component: AllPayments,
})