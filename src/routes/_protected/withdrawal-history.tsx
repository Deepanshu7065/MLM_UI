import AllWithdrawals from '@/components/CheckStatus/AllWithdraw'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/withdrawal-history')({
  component: AllWithdrawals,
})