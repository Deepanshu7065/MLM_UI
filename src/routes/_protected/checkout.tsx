import PayoutPage from '@/components/PlaceOrder.tsx/CheckOutPage'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/checkout')({
  component: PayoutPage,
})
