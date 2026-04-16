
import CheckOrder from '@/components/CheckStatus/successPayment'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/payment-success')({
  component: CheckOrder,
})