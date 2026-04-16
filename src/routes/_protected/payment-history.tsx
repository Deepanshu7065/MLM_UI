import PaymentHistory from '@/components/CheckStatus/PaymentHistory'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/payment-history')({
  component: PaymentHistory,
})
